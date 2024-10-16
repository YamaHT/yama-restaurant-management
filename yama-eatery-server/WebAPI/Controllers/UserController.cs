using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.User;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class UserController(IUnitOfWork _unitOfWork, IConfiguration _configuration) : ApiController
    {
        [HttpGet("profile")]
        public async Task<IActionResult> Profile()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Membership"]);
            GetUserProfileDTO userProfileDTO = new()
            {
                Birthday = user.Birthday,
                Gender = user.Gender,
                Image = user.Image,
                Membership = user.Membership,
                Name = user.Name,
                Phone = user.Phone,
                CreationDate = user.CreationDate
            };
            return Ok(userProfileDTO);
        }

        [HttpPost("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileDTO updateUserProfileDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Membership"]);
            user.Birthday = updateUserProfileDTO.Birthday;
            user.Gender = updateUserProfileDTO.Gender;
            user.Image = updateUserProfileDTO.Image;
            user.Name = updateUserProfileDTO.Name;
            user.Phone = updateUserProfileDTO.Phone;
            user.TryValidate();

            return Ok(new { success = "Update profile successfully" });
        }

        [HttpPost("change-password")]
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

        [HttpGet("cancel-booking/{bookingId}")]
        public async Task<IActionResult> CancelBooking(int bookingId)
        {
            var booking = await _unitOfWork.BookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
            {
                throw new DataNotFoundException($"Booking with ID {bookingId} not found.");
            }

            if (Enum.TryParse(booking.BookingStatus.ToString(), out BookingStatusEnum status) && (status == BookingStatusEnum.Undeposited || status == BookingStatusEnum.Booking))
            {
                _unitOfWork.BookingRepository.Remove(booking);
                await _unitOfWork.SaveChangeAsync();
                return Ok($"Booking with ID {bookingId} has been canceled successfully.");
            }
            else
            {
                throw new DataNotFoundException($"Cannot cancel booking. Current status is: {booking.BookingStatus}.");
            }
        }

        [HttpGet("history-feedback")]
        public async Task<IActionResult> HistoryFeedbacks()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Feedbacks"]);
            return Ok(user?.Feedbacks);
        }

        [HttpGet("history-booking")]
        public async Task<IActionResult> GetHistoryBooking()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Bookings"]);
            return Ok(user?.Bookings);
        }

        [HttpGet("my-vouchers")]
        public async Task<IActionResult> GetMyVouchers()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["UserVouchers"]);
            return Ok(user?.UserVouchers);
        }
    }
}
