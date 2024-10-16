using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.User;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class UserController(IUnitOfWork _unitOfWork, IConfiguration _configuration) : ApiController
    {
        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] UserChangePasswordDTO userChangePasswordDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            if (!CryptoUtils.IsPasswordCorrect(userChangePasswordDTO.Password, user.Password))
            {
                throw new InvalidDataException("Oldpassword is not correct");
            }
            user.Password = CryptoUtils.EncryptPassword(userChangePasswordDTO.NewPassword);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = "Change Password successfully" });
        }
        [HttpGet]
        public async Task<IActionResult> CancelBooking(int bookingID)
        {
            var booking = await _unitOfWork.BookingRepository.GetByIdAsync(bookingID);
            if (booking == null)
            {
                throw new DataNotFoundException($"Booking with ID {bookingID} not found.");
            }
            if (Enum.TryParse(booking.BookingStatus.ToString(), out BookingStatusEnum status) && (status == BookingStatusEnum.Undeposited || status == BookingStatusEnum.Booking))
            {
                _unitOfWork.BookingRepository.Remove(booking);
                await _unitOfWork.SaveChangeAsync();
                return Ok($"Booking with ID {bookingID} has been canceled successfully.");
            }
            else
            {
                throw new DataNotFoundException($"Cannot cancel booking. Current status is: {booking.BookingStatus}.");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllFeedbacks(int? productId = null, int? rating = null)
        {
            var feedbacks = await _unitOfWork.FeedbackProductRepository.GetAllAsync();
            return Ok(feedbacks);
        }
        [HttpGet]
        public async Task<IActionResult> GetHistoryBooking(int userId)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(userId, ["Bookings"]);
            return Ok(user);
        }
        [HttpGet]
        public async Task<IActionResult> GetMyVouchers(int userIds)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(userIds, ["UserVouchers"]);
            return Ok(user);
        }
    }
}
