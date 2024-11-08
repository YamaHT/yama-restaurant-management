using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Booking;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Staff))]
    public class BookingManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllBookingInDayPart(string dayPart)
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllBookingInDayPartAsync(dayPart);
            return Ok(bookings);
        }

        [HttpGet("table-not-booked")]
        public async Task<IActionResult> GetAllTableNotBookedInDayPart(string dayPart)
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllBookingInDayPartAsync(dayPart);

            var tablesBooked = bookings.Select(x => x.Table.Id).ToList();

            var tables = await _unitOfWork.TableRepository.GetAllAsync();

            var tablesNotBooked = tables.Where(x => !tablesBooked.Contains(x.Id)).ToList();
            return Ok(tablesNotBooked);
        }

        [HttpGet("detail")]
        public async Task<IActionResult> GetBookingDetail(Guid id)
        {
            string[] includes = ["User", "Table", "Employee", "BookingDetails", "BookingDetails.Product", "BookingDetails.Product.SubCategory", "BookingDetails.Product.SubCategory.Category"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(id, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            if (booking.Employee == null)
            {
                booking.Employee = await _unitOfWork.GetEmployeeFromHttpContextAsync(HttpContext);
                _unitOfWork.BookingRepository.Update(booking);
                await _unitOfWork.SaveChangeAsync();
            }

            return Ok(booking);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBooking([FromBody] AddBookingDTO addBookingDTO)
        {
            var table = await _unitOfWork.TableRepository.GetByIdAsync(addBookingDTO.TableId);
            if (table == null)
            {
                throw new DataNotFoundException("Table not found");
            }

            var employee = await _unitOfWork.GetEmployeeFromHttpContextAsync(HttpContext);

            var booking = new Booking
            {
                TotalPayment = 0,
                DepositPrice = 0,
                RemainPayment = 0,
                BookingDate = DateOnly.FromDateTime(DateTime.Now),
                DayPart = addBookingDTO.DayPart,
                BookingStatus = BookingStatusEnum.Booking.ToString(),
                Table = table,
                Employee = employee,
            };
            booking.TryValidate();

            await _unitOfWork.BookingRepository.AddAsync(booking);
            await _unitOfWork.SaveChangeAsync();
            return RedirectToAction("GetAllBookingInDayPart", new { dayPart = addBookingDTO.DayPart });
        }

        [HttpPost("add-detail")]
        public async Task<IActionResult> AddProductToBooking([FromBody] GetBookingDetailDTO getBookingDetailDTO)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(getBookingDetailDTO.ProductId);
            if (product == null)
            {
                throw new DataNotFoundException("Product not found");
            }

            string[] includes = ["BookingDetails", "BookingDetails.Product"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(getBookingDetailDTO.BookingId, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            var detail = booking.BookingDetails.FirstOrDefault(x => x.ProductId == getBookingDetailDTO.ProductId);
            if (detail != null)
            {
                detail.Quantity++;
                _unitOfWork.BookingDetailRepository.Update(detail);
            }
            else
            {
                detail = new BookingDetail
                {
                    ProductId = getBookingDetailDTO.ProductId,
                    BookingId = getBookingDetailDTO.BookingId,
                    Quantity = 1
                };
                await _unitOfWork.BookingDetailRepository.AddAsync(detail);
            }

            booking.TotalPayment = booking.BookingDetails.Sum(x => x.Product!.Price * x.Quantity);
            _unitOfWork.BookingRepository.Update(booking);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = getBookingDetailDTO.BookingId });
        }

        [HttpPost("update-detail-quantity")]
        public async Task<IActionResult> UpdateBookingDetailQuantity([FromBody] UpdateBookingDetailDTO updateBookingDetailDTO)
        {
            string[] includes = ["BookingDetails", "BookingDetails.Product"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(updateBookingDetailDTO.BookingId, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            var detail = booking.BookingDetails.FirstOrDefault(x => x.ProductId == updateBookingDetailDTO.ProductId)!;

            if (updateBookingDetailDTO.Quantity > detail.Product?.StockQuantity)
            {
                throw new InvalidDataException("This product is not enough stock");
            }

            if (updateBookingDetailDTO.Quantity <= 0)
            {
                _unitOfWork.BookingDetailRepository.Remove(detail);
                booking.BookingDetails.Remove(detail);
            }
            else
            {
                detail.Quantity = updateBookingDetailDTO.Quantity;
                _unitOfWork.BookingDetailRepository.Update(detail);
            }

            booking.TotalPayment = booking.BookingDetails.Sum(x => x.Product!.Price * x.Quantity);
            _unitOfWork.BookingRepository.Update(booking);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = updateBookingDetailDTO.BookingId });
        }

        [HttpPost("delete-detail")]
        public async Task<IActionResult> DeleteBookingDetail([FromBody] GetBookingDetailDTO getBookingDetailDTO)
        {
            string[] includes = ["BookingDetails", "BookingDetails.Product"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(getBookingDetailDTO.BookingId, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            var detail = booking.BookingDetails.FirstOrDefault(x => x.ProductId == getBookingDetailDTO.ProductId)!;

            _unitOfWork.BookingDetailRepository.Remove(detail);
            booking.BookingDetails.Remove(detail);

            booking.TotalPayment = booking.BookingDetails.Sum(x => x.Product!.Price * x.Quantity);
            _unitOfWork.BookingRepository.Update(booking);

            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = getBookingDetailDTO.BookingId });
        }

        [HttpPost("pay")]
        public async Task<IActionResult> PayBooking([FromBody] Guid bookingId)
        {
            string[] includes = ["BookingDetails", "Voucher", "User", "User.Membership"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(bookingId, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            var remainPayment = booking.TotalPayment - booking.DepositPrice;
            if (booking.User != null && booking.User.Membership!.MembershipStatus == MembershipStatusEnum.Active.ToString())
            {
                Enum.TryParse<RankEnum>(booking.User.Membership.Rank, out var rank);
                remainPayment -= remainPayment * ((int)rank / 100.0);

                booking.User.Membership.MemberScore += (int)Math.Floor(booking.TotalPayment / 10);
                int score = booking.User.Membership.MemberScore;

                if (score > 500)
                {
                    booking.User.Membership.Rank = RankEnum.Platinum.ToString();
                }
                else if (score > 200)
                {
                    booking.User.Membership.Rank = RankEnum.Gold.ToString();
                }
                else if (score > 100)
                {
                    booking.User.Membership.Rank = RankEnum.Silver.ToString();
                }

                _unitOfWork.MembershipRepository.Update(booking.User.Membership);
            }

            if (booking.Voucher != null)
            {
                remainPayment -= Math.Min(remainPayment * (booking.Voucher.ReducedPercent / 100.0),
                                          booking.Voucher.MaxReducing);
            }

            booking.RemainPayment = remainPayment;
            booking.BookingStatus = BookingStatusEnum.Completed.ToString();

            _unitOfWork.BookingRepository.Update(booking);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = bookingId });
        }
    }
}
