using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json.Serialization;
using WebAPI.DTOs.User;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.EmailSender;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class AuthController(IUnitOfWork _unitOfWork, IConfiguration _configuration) : ApiController
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var user = await _unitOfWork.UserRepository.GetByEmailAndPassword(userLoginDTO.Email, userLoginDTO.Password);
            var jwt = user?.GenerateJWT(_configuration["JWT:SecretKey"]);
            return !string.IsNullOrEmpty(jwt)
                ? Ok(new
                {
                    token = jwt,
                    role = RoleEnum.Customer.ToString()
                })
                : throw new DataNotFoundException("Invalid email or password");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO userRegisterDTO)
        {
            if (await _unitOfWork.UserRepository.CheckEmailExisted(userRegisterDTO.Email))
            {
                throw new DataConflictException("Email existed");
            }

            var membership = new Membership()
            {
                MembershipStatus = MembershipStatusEnum.Inactive.ToString(),
                Rank = RankEnum.Member.ToString()
            };

            var user = new User
            {
                Email = userRegisterDTO.Email,
                Password = userRegisterDTO.Password,
                Name = $"{userRegisterDTO.LastName} {userRegisterDTO.FirstName}".Trim(),
                Phone = userRegisterDTO.Phone,
                Membership = membership
            };
            user.TryValidate();

            user.Password = CryptoUtils.EncryptPassword(user.Password);

            await _unitOfWork.MembershipRepository.AddAsync(membership);
            await _unitOfWork.UserRepository.AddAsync(user);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = "Register successfully" });
        }

        [HttpPost("send-mail-otp")]
        public async Task<IActionResult> SendMailOTP([FromBody] UserSendOtpDTO userSendOtpDTO)
        {
            _ = Task.Run(() => SendMailUtil.SendMailOtpAsync(_configuration, userSendOtpDTO.Email, userSendOtpDTO.OTP));
            return Ok(new { success = "Send OTP successfully" });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var user = await _unitOfWork.UserRepository.GetByEmail(email);

            string password = StringUtil.GenerateRandomPassword();
            _ = Task.Run(() => SendMailUtil.SendMailPasswordAsync(_configuration, email, password));

            user.Password = CryptoUtils.EncryptPassword(password);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = "Reset Password successfully" });
        }

        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmailExisted(string email)
        {
            return Ok(await _unitOfWork.UserRepository.CheckEmailExisted(email));
        }

    }
}
