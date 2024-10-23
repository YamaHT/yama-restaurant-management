using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.User;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Customer))]
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
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserProfileDTO updateUserProfileDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            user.Birthday = updateUserProfileDTO.Birthday;
            user.Gender = updateUserProfileDTO.Gender;
            user.Image = await ImageUtil.UpdateImageAsync(nameof(User), user.Image, updateUserProfileDTO.ImageFile);
            user.Name = updateUserProfileDTO.Name;
            user.Phone = updateUserProfileDTO.Phone;
            user.TryValidate();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return Ok(new { success = "Update profile successfully" });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] UserChangePasswordDTO userChangePasswordDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            if (!CryptoUtil.IsPasswordCorrect(userChangePasswordDTO.Password, user.Password))
            {
                throw new InvalidDataException("Oldpassword is not correct");
            }

            user.Password = CryptoUtil.EncryptPassword(userChangePasswordDTO.NewPassword);

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return Ok(new { success = "Change Password successfully" });
        }

        [HttpGet("history-feedback")]
        public async Task<IActionResult> HistoryFeedbacks()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Feedbacks", "Feedbacks.Product"]);
            return Ok(user?.Feedbacks);
        }

        [HttpGet("history-booking")]
        public async Task<IActionResult> HistoryBooking()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Bookings", "Bookings.BookingDetails", "Bookings.Table"]);
            return Ok(user?.Bookings);
        }

        [HttpGet("my-vouchers")]
        public async Task<IActionResult> MyVouchers()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["UserVouchers", "UserVouchers.Voucher"]);
            return Ok(user?.UserVouchers);
        }

        [HttpPost("contact")]
        public async Task<IActionResult> Contact([FromBody] UserContactDTO userContactDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            var contact = new Contact
            {
                FullName = userContactDTO.Name,
                Title = userContactDTO.Title,
                Message = userContactDTO.Message,
                User = user
            };

            contact.TryValidate();

            await _unitOfWork.ContactRepository.AddAsync(contact);
            await _unitOfWork.SaveChangeAsync();

            return Ok(new { success = "Contact send successfully" });
        }

        [HttpGet("user-membership")]
        public async Task<IActionResult> UserMembership()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Membership"]);
            return Ok(user.Membership);
        }

        [HttpPost("register-membership")]
        public async Task<IActionResult> RegisterMembership()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Membership"]);

            user.Membership.MembershipStatus = MembershipStatusEnum.Requesting.ToString();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return Ok(user.Membership);
        }

        [HttpPost("cancel-membership")]
        public async Task<IActionResult> CancelMembership()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["Membership"]);

            user.Membership.MembershipStatus = MembershipStatusEnum.Inactive.ToString();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();
            
            return Ok(user.Membership);
        }
    }
}
