using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Booking;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Customer))]
    public class BookingController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("booked-daypart")]
        public async Task<IActionResult> GetBookedDayPartOfTable(int tableId, DateOnly date)
        {
            var listDayPart = await _unitOfWork.BookingRepository.GetAllBookedDayPartOfTableInDateAsync(tableId, date);
            return Ok(listDayPart);
        }

        [HttpGet("valid-vouchers")]
        public async Task<IActionResult> GetValidVoucher()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            var validUserVoucher = await _unitOfWork.UserVoucherRepository.GetValidUserVouchersByUserId(user.Id);
            return Ok(validUserVoucher);
        }

        [HttpPost("reserve")]
        public async Task<IActionResult> Reserve([FromBody] AddUserBookingDTO addUserBookingDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Bookings"]);
            if (user.Bookings.FirstOrDefault(x => x.BookingDate == addUserBookingDTO.BookingDate
                                               && x.DayPart == addUserBookingDTO.DayPart) != null)
            {
                throw new DataConflictException("This part of day did have a booking");
            }

            var table = await _unitOfWork.TableRepository.GetByIdAsync(addUserBookingDTO.TableId);
            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(addUserBookingDTO.VoucherId);
            if (voucher != null)
            {
                var userVoucher = await _unitOfWork.UserVoucherRepository.GetByUserIdAndVoucherId(user.Id, voucher.Id);
                if (userVoucher != null)
                {
                    userVoucher.IsUsed = true;
                    voucher.Quantity -= 1;

                    _unitOfWork.UserVoucherRepository.Update(userVoucher);
                    _unitOfWork.VoucherRepository.Update(voucher);
                }
            }

            var booking = new Booking
            {
                CustomerName = $"{addUserBookingDTO.LastName} {addUserBookingDTO.FirstName}".Trim(),
                Phone = addUserBookingDTO.Phone,
                BookingDate = addUserBookingDTO.BookingDate,
                DayPart = addUserBookingDTO.DayPart,
                BookingStatus = BookingStatusEnum.Undeposited.ToString(),
                Note = addUserBookingDTO.Note,
                DepositPrice = addUserBookingDTO.DepositPrice,
                NewPaymentDate = DateTime.Now,
                User = user,
                Table = table,
                Voucher = voucher
            };

            booking.TryValidate();

            await _unitOfWork.BookingRepository.AddAsync(booking);

            List<BookingDetail> bookingDetails = [];
            foreach (var item in addUserBookingDTO.Products)
            {
                var product = await _unitOfWork.ProductRepository.GetByIdAsync(item.ProductId);
                if (product == null)
                {
                    continue;
                }

                product.StockQuantity -= item.Quantity;
                _unitOfWork.ProductRepository.Update(product);

                var detail = new BookingDetail
                {
                    BookingId = booking.Id,
                    ProductId = item.ProductId,
                    CookingStatus = CookingStatusEnum.InCooking.ToString(),
                    Quantity = item.Quantity,
                };
                bookingDetails.Add(detail);
            }

            if (bookingDetails.Any())
            {
                await _unitOfWork.BookingDetailRepository.AddRangeAsync(bookingDetails);
            }

            await _unitOfWork.SaveChangeAsync();
            await Task.WhenAll();

            string? paymentURL = await PayOSPayment.GeneratePaymentLink(_unitOfWork, booking.Id);
            if (paymentURL == null)
            {
                _unitOfWork.BookingRepository.Remove(booking);
                await _unitOfWork.SaveChangeAsync();
                throw new InvalidDataException("Booking can't be completed. Please try again");
            }

            return Ok(new
            {
                success = $"Reserve a booking successfully. You can now pay for its deposit (${booking.DepositPrice})",
                paymentURL
            });
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPayment([FromBody] string bookingId)
        {
            if (!Guid.TryParse(bookingId, out var id))
            {
                throw new InvalidDataException("Invalid booking id");
            }

            string[] includes = ["BookingDetails", "BookingDetails.Product"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(id, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            if (booking.BookingStatus != BookingStatusEnum.Undeposited.ToString())
            {
                throw new DataConflictException("This booking is already paid");
            }

            var information = await booking.GetPaymentInformation();
            if (information.status != "PAID")
            {
                throw new InvalidDataException("The booking is not paid");
            }

            booking.BookingStatus = BookingStatusEnum.Booking.ToString();

            _unitOfWork.BookingRepository.Update(booking);
            await _unitOfWork.SaveChangeAsync();

            return Ok(new { success = "Pay for booking deposit successfully" });
        }

        [HttpPost("cancel")]
        public async Task<IActionResult> CancelBooking([FromBody] string bookingId)
        {
            if (!Guid.TryParse(bookingId, out var id))
            {
                throw new InvalidDataException("Invalid booking id");
            }

            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(id);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking is not existed");
            }

            _unitOfWork.BookingRepository.Remove(booking);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("HistoryBooking", "User");
        }

        [HttpPost("re-pay")]
        public async Task<IActionResult> RepayDeposit([FromBody] string bookingId)
        {
            if (!Guid.TryParse(bookingId, out var id))
            {
                throw new InvalidDataException("Invalid booking id");
            }

            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(id);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking is not existed");
            }

            if (booking.BookingDate < DateOnly.FromDateTime(DateTime.Now))
            {
                _unitOfWork.BookingRepository.Remove(booking);
                await _unitOfWork.SaveChangeAsync();
                throw new InvalidDataException("This booking is expired to be booked, we will remove it from your history");
            }

            var paymentURL = "";

            var information = await booking.GetPaymentInformation();
            if (information.status == "PAID")
            {
                booking.BookingStatus = BookingStatusEnum.Booking.ToString();

                _unitOfWork.BookingRepository.Update(booking);
                await _unitOfWork.SaveChangeAsync();

                throw new DataConflictException("This booking is already paid");
            }
            else if (information.status == "PENDING")
            {
                paymentURL = "https://pay.payos.vn/web/" + information.id;
            }
            else if (information.status == "CANCELLED")
            {
                booking.NewPaymentDate = DateTime.Now;

                _unitOfWork.BookingRepository.Update(booking);
                await _unitOfWork.SaveChangeAsync();
                await Task.WhenAll();

                paymentURL = await PayOSPayment.GeneratePaymentLink(_unitOfWork, id);
            }

            return Ok(paymentURL);
        }
    }
}
