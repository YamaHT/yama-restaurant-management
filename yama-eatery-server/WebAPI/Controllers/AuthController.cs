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
            return !string.IsNullOrEmpty(jwt)
                ? Ok(new
                {
                    token = jwt,
                    role = RoleEnum.Customer.ToString()
                })
                : throw new DataNotFoundException("Invalid email or password");
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO userRegisterDTO)
        {
            if (await _unitOfWork.UserRepository.CheckEmailExisted(userRegisterDTO.Email))
            {
                throw new DataConflictException("Email existed");
            }

            var user = new User
            {
                Email = userRegisterDTO.Email,
                Password = userRegisterDTO.Password,
                Name = $"{userRegisterDTO.LastName} {userRegisterDTO.FirstName}".Trim(),
                Phone = userRegisterDTO.Phone
            };
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
        [HttpPost]
        public async Task<IActionResult> SendMailPassword([FromBody]  string email)
        {
            var user = await _unitOfWork.UserRepository.GetUserByEmail(email);
            if (user == null)
            {
                throw new DataNotFoundException("Email not existed");
            }

            string password = StringUtil.GenerateRandomPassword();
            await SendMailUtil.SendMailPasswordAsync(_configuration, email, password);

            user.Password = CryptoUtils.EncryptPassword(password);
             _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = "Reset Password successfully" });
        }
       
    }
}
