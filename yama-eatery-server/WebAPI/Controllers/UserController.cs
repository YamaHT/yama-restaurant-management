using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAPI.DTOs.User;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class UserController(IUnitOfWork _unitOfWork, IConfiguration _configuration) : ApiController
    {
        [HttpGet, Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var claim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var userProfile = await _unitOfWork.UserRepository.GetByIdAsync(int.TryParse(claim, out var userId) ? userId : 0);
            return userProfile != null
                ? Ok(new
                {
                    userProfile.Email,
                    userProfile.Image,
                    userProfile.Name,
                    userProfile.Phone,
                    userProfile.Birthday,
                    userProfile.Gender,
                    userProfile.Membership
                })
                : throw new DataNotFoundException("User profile not found.");
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfileDTO userProfileDTO)
        {
            var claim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var userProfile = await _unitOfWork.UserRepository.GetByIdAsync(int.TryParse(claim, out var userId) ? userId : 0);
            userProfileDTO.TryValidate();
            if (userProfile == null) throw new DataNotFoundException("User profile not found.");
            
            userProfile.Image = userProfileDTO.Image;
            userProfile.Name = userProfileDTO.Name;
            userProfile.Birthday = userProfileDTO.Birthday;
            userProfile.Phone = userProfileDTO.Phone?.ToArray();
            userProfile.Gender = userProfileDTO.Gender?.ToArray();

            _unitOfWork.UserRepository.Update(userProfile);
            await _unitOfWork.SaveChangeAsync();
            return Ok(new
            {
                userProfile.Email,
                userProfile.Image,
                userProfile.Name,
                userProfile.Phone,
                userProfile.Birthday,
                userProfile.Gender,
                userProfile.Membership
            });
        }
    }
}
