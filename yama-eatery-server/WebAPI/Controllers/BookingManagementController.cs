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
        public async Task<IActionResult> GetAllBookingInDateAndDayPart(DateOnly date, string dayPart)
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllBookingInDateAndDayPartAsync(date, dayPart);
            return Ok(bookings);
        }

        [HttpGet("table-not-booked")]
        public async Task<IActionResult> GetAllTableNotBookedInDateAndDayPart(DateOnly date, string dayPart)
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllBookingInDateAndDayPartAsync(date, dayPart);

            var tablesBooked = bookings.Select(x => x.Table?.Id).ToList();

            var tables = await _unitOfWork.TableRepository.GetAllAsync();

            var tablesNotBooked = tables.Where(x => !tablesBooked.Contains(x.Id)).ToList();
            return Ok(tablesNotBooked);
        }

        [HttpGet("history-invoice")]
        public async Task<IActionResult> GetAllBookedInvoiceInDateAndDayPart(DateOnly date, string dayPart)
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllBookedInvoiceInDateAndDayPartAsync(date, dayPart);
            return Ok(bookings);
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
                BookingDate = addBookingDTO.Date,
                DayPart = addBookingDTO.DayPart,
                BookingStatus = BookingStatusEnum.Booking.ToString(),
                Table = table,
                Employee = employee,
            };
            booking.TryValidate();

            await _unitOfWork.BookingRepository.AddAsync(booking);
            await _unitOfWork.SaveChangeAsync();
            return RedirectToAction("GetAllBookingInDateAndDayPart", new { date = addBookingDTO.Date, dayPart = addBookingDTO.DayPart });
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateBooking([FromBody] UpdateBookingDTO updateBookingDTO)
        {
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(updateBookingDTO.Id);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            booking.CustomerName = updateBookingDTO.CustomerName;
            booking.Phone = updateBookingDTO.Phone;
            booking.Note = updateBookingDTO.Note;

            booking.TryValidate();

            _unitOfWork.BookingRepository.Update(booking);
            await _unitOfWork.SaveChangeAsync();
            return RedirectToAction("GetBookingDetail", new { id = booking.Id });
        }

        [HttpPost("add-detail")]
        public async Task<IActionResult> AddBookingDetail([FromBody] AddBookingDetailDTO addBookingDetailDTO)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(addBookingDetailDTO.ProductId);
            if (product == null)
            {
                throw new DataNotFoundException("Product not found");
            }

            string[] includes = ["BookingDetails", "BookingDetails.Product"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(addBookingDetailDTO.BookingId, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            var detail = booking.BookingDetails.FirstOrDefault(x => x.ProductId == addBookingDetailDTO.ProductId && x.CookingStatus == CookingStatusEnum.InCooking.ToString());
            if (detail != null)
            {
                detail.Quantity = Math.Min(product.StockQuantity, ++detail.Quantity);
                _unitOfWork.BookingDetailRepository.Update(detail);
            }
            else
            {
                detail = new BookingDetail
                {
                    ProductId = addBookingDetailDTO.ProductId,
                    BookingId = addBookingDetailDTO.BookingId,
                    CookingStatus = CookingStatusEnum.InCooking.ToString(),
                    Quantity = 1
                };
                await _unitOfWork.BookingDetailRepository.AddAsync(detail);
            }

            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = addBookingDetailDTO.BookingId });
        }

        [HttpPost("update-detail-quantity")]
        public async Task<IActionResult> UpdateBookingDetailQuantity([FromBody] UpdateBookingDetailQuantityDTO updateBookingDetailDTO)
        {
            string[] includes = ["Product"];
            var detail = await _unitOfWork.BookingDetailRepository.GetByIdAsync(updateBookingDetailDTO.BookingDetailId, includes);
            if (detail == null)
            {
                throw new DataNotFoundException("Booking Detail not found");
            }

            if (updateBookingDetailDTO.Quantity <= 0)
            {
                _unitOfWork.BookingDetailRepository.Remove(detail);
            }
            else
            {
                detail.Quantity = updateBookingDetailDTO.Quantity;
                _unitOfWork.BookingDetailRepository.Update(detail);
            }

            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = detail.BookingId });
        }

        [HttpPost("update-detail-status")]
        public async Task<IActionResult> UpdateBookingDetailStatus([FromBody] UpdateBookingDetailStatusDTO updateBookingDetailStatusDTO)
        {
            string[] includes = ["Product"];
            var detail = await _unitOfWork.BookingDetailRepository.GetByIdAsync(updateBookingDetailStatusDTO.BookingDetailId, includes);
            if (detail == null)
            {
                throw new DataNotFoundException("Booking Detail not found");
            }

            detail.CookingStatus = updateBookingDetailStatusDTO.CookingStatus;
            detail.TryValidate();

            if (detail.CookingStatus == CookingStatusEnum.Cooked.ToString())
            {
                if (detail.Product!.StockQuantity < detail.Quantity)
                {
                    throw new InvalidDataException("This product is out of stock");
                }

                detail.Product.StockQuantity -= detail.Quantity;
                _unitOfWork.ProductRepository.Update(detail.Product);
            }

            _unitOfWork.BookingDetailRepository.Update(detail);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = detail.BookingId });
        }

        [HttpPost("delete-detail")]
        public async Task<IActionResult> DeleteBookingDetail([FromBody] int bookingDetailId)
        {
            var detail = await _unitOfWork.BookingDetailRepository.GetByIdAsync(bookingDetailId);
            if (detail == null)
            {
                throw new DataNotFoundException("Booking Detail not found");
            }

            _unitOfWork.BookingDetailRepository.Remove(detail);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = detail.BookingId });
        }

        [HttpPost("pay")]
        public async Task<IActionResult> PayBooking([FromBody] Guid bookingId)
        {
            string[] includes = ["BookingDetails", "BookingDetails.Product", "Voucher", "User", "User.Membership"];
            var booking = await _unitOfWork.BookingRepository.GetByGuidAsync(bookingId, includes);
            if (booking == null)
            {
                throw new DataNotFoundException("Booking not found");
            }

            if (booking.BookingDetails.Count == 0 && booking.DepositPrice == 0)
            {
                _unitOfWork.BookingRepository.Remove(booking);
                await _unitOfWork.SaveChangeAsync();
                throw new InvalidDataException("This booking will be deleted due to contaning no food");
            }

            if (booking.BookingDate > DateOnly.FromDateTime(DateTime.Today))
            {
                throw new InvalidDataException("Can't pay the future booking");
            }

            if (!booking.BookingDetails.All(x => x.CookingStatus == CookingStatusEnum.Cooked.ToString()))
            {
                throw new InvalidDataException("This booking has uncooked foods");
            }

            booking.TotalPayment = booking.BookingDetails.Sum(x => x.Quantity * x.Product!.Price);

            var remainPayment = booking.TotalPayment - booking.DepositPrice;
            if (booking.User != null && booking.User.Membership!.MembershipStatus == MembershipStatusEnum.Active.ToString())
            {
                _ = Enum.TryParse<RankEnum>(booking.User.Membership.Rank, out var rank);
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
            booking.NewPaymentDate = DateTime.Now;

            booking.BookingDetails.ToList().ForEach(bookingDetail => bookingDetail.UnitPrice = bookingDetail.Product.Price);
            _unitOfWork.BookingDetailRepository.UpdateRange(booking.BookingDetails.ToList());

            _unitOfWork.BookingRepository.Update(booking);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetBookingDetail", new { id = bookingId });
        }
    }
}
