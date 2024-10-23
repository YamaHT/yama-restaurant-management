using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using WebAPI.DTOs.Booking;
using WebAPI.DTOs.User;
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
            var validUserVoucher = await _unitOfWork.UserVoucherRepository.GetValidUserVouchersOfUserId(user.Id);
            return Ok(validUserVoucher);
        }

        [HttpPost("reserve")]
        public async Task<IActionResult> Reserve([FromBody] AddBookingDTO addBookingDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Bookings"]);
            var table = await _unitOfWork.TableRepository.GetByIdAsync(addBookingDTO.TableId);
            var userVoucher = await _unitOfWork.UserVoucherRepository.GetByIdAsync(addBookingDTO.UserVoucherId);

            if (user.Bookings.FirstOrDefault(x => x.BookingDate == addBookingDTO.BookingDate
                && x.DayPart == addBookingDTO.DayPart) != null)
            {
                throw new DataConflictException("This part of day did have a booking");
            }

            var booking = new Booking
            {
                CustomerName = $"{addBookingDTO.LastName} {addBookingDTO.FirstName}".Trim(),
                Phone = addBookingDTO.Phone,
                BookingDate = addBookingDTO.BookingDate,
                DayPart = addBookingDTO.DayPart,
                BookingStatus = BookingStatusEnum.Undeposited.ToString(),
                Note = addBookingDTO.Note,
                TotalPayment = addBookingDTO.TotalPayment,
                DepositPrice = addBookingDTO.DepositPrice,
                User = user,
                Table = table,
                UserVoucher = userVoucher
            };

            booking.TryValidate();

            await _unitOfWork.BookingRepository.AddAsync(booking);

            List<BookingDetail> bookingDetails = [];
            foreach (var item in addBookingDTO.Products)
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
                    Quantity = item.Quantity,
                };
                bookingDetails.Add(detail);
            }

            if (bookingDetails.Any())
            {
                await _unitOfWork.BookingDetailRepository.AddRangeAsync(bookingDetails);
            }

            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = $"Reserve a booking successfully. You can now pay for its deposit (${booking.DepositPrice})" });
        }
    }
}
