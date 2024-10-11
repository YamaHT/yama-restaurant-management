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
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmailAndPassword(userLoginDTO.Email, userLoginDTO.Password);
            var jwt = user?.GenerateJWT(_configuration["JWT:SecretKey"]);
            return !string.IsNullOrEmpty(jwt) ? Ok(jwt) : throw new DataNotFoundException("Invalid email or password");
        }

        [HttpPost] // This function must change to use UserRegisterDTO for FirstName and LastName
        public async Task<IActionResult> Register([FromBody] UserLoginDTO userLoginDTO)
        {
            if (await _unitOfWork.UserRepository.CheckEmailExisted(userLoginDTO.Email))
            {
                throw new DataConflictException("Email existed");
            }

            var user = new User { Email = userLoginDTO.Email, Password = userLoginDTO.Password };
            user.TryValidate();

            user.Password = CryptoUtils.EncryptPassword(user.Password);

            await _unitOfWork.UserRepository.AddAsync(user);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = "Register successfully" });
        }

        [HttpPost]
        public async Task<IActionResult> SendMailOTP([FromBody] UserSendOtpDTO userSendOtpDTO)
        {
            await SendMailUtil.SendMailOtpAsync(_configuration, userSendOtpDTO.Email, userSendOtpDTO.OTP);
            return Ok(new { success = "Send OTP successfully" });
        }
    }
}
