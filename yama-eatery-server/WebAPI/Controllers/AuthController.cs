using Microsoft.AspNetCore.Mvc;
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
            var user = await _unitOfWork.UserRepository.GetByEmailAndPasswordAsync(userLoginDTO.Email, userLoginDTO.Password);
            if (user != null)
            {
                var jwt = user?.GenerateJwtUser(_configuration["JWT:SecretKey"]);
                return Ok(new { token = jwt, role = RoleEnum.Customer.ToString() });
            }

            var employee = await _unitOfWork.EmployeeRepository.GetByEmailAndPasswordAsync(userLoginDTO.Email, userLoginDTO.Password);
            if (employee != null)
            {
                var jwt = employee?.GenerateJwtEmployee(_configuration["JWT:SecretKey"]);
                return Ok(new { token = jwt, role = employee?.Position?.Name ?? RoleEnum.Staff.ToString() });
            }

            throw new DataNotFoundException("Invalid email or password");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO userRegisterDTO)
        {
            if (await _unitOfWork.UserRepository.CheckEmailExistedAsync(userRegisterDTO.Email)
                || await _unitOfWork.EmployeeRepository.CheckEmailExistedAsync(userRegisterDTO.Email))
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

            user.Password = CryptoUtil.EncryptPassword(user.Password);

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
            var user = await _unitOfWork.UserRepository.GetByEmailAsync(email);

            string password = StringUtil.GenerateRandomPassword();
            _ = Task.Run(() => SendMailUtil.SendMailPasswordAsync(_configuration, email, password));
            
            user.Password = CryptoUtil.EncryptPassword(password);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new { success = "Reset Password successfully" });
        }

        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmailExisted(string email)
        {
            return Ok(await _unitOfWork.UserRepository.CheckEmailExistedAsync(email) || await _unitOfWork.EmployeeRepository.CheckEmailExistedAsync(email));
        }

        [HttpPost("login-google")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] GoogleProfileDTO googleProfileDTO)
        {
            var employee = await _unitOfWork.EmployeeRepository.GetByEmailAsync(googleProfileDTO.Email);
            if (employee != null)
            {
                var jwtEmployee = employee?.GenerateJwtEmployee(_configuration["JWT:SecretKey"]);
                return Ok(new { token = jwtEmployee, role = employee?.Position?.Name ?? RoleEnum.Staff.ToString() });
            }

            var user = await _unitOfWork.UserRepository.GetByEmailAsync(googleProfileDTO.Email);
            if (user == null)
            {
                var membership = new Membership()
                {
                    MembershipStatus = MembershipStatusEnum.Inactive.ToString(),
                    Rank = RankEnum.Member.ToString()
                };

                user = new User
                {
                    Email = googleProfileDTO.Email,
                    Password = CryptoUtil.EncryptPassword(StringUtil.GenerateRandomPassword()),
                    Name = googleProfileDTO.Name,
                    Image = await ImageUtil.AddImageFromUrlAsync(nameof(User), googleProfileDTO.Name, googleProfileDTO.Picture),
                    Membership = membership
                };
                await _unitOfWork.MembershipRepository.AddAsync(membership);
                await _unitOfWork.UserRepository.AddAsync(user);
                await _unitOfWork.SaveChangeAsync();
            }
            
            var jwt = user?.GenerateJwtUser(_configuration["JWT:SecretKey"]);
            return Ok(new { token = jwt, role = RoleEnum.Customer.ToString() });
        }
    }
}
