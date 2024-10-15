using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.User;
using WebAPI.Utils;

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
            await _unitOfWork.SaveChangeAsync(); ;
            return Ok(new { success = "Change Password successfully" });
        }
    }
}
