using Application.Services;
using Application.ViewModels.UserViewModels;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
	public class AuthController(IAuthService _authenticateService) : ApiController
	{
		[HttpPost]
		public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
		{
			var jwt = await _authenticateService.Login(userLoginDTO);
			return !string.IsNullOrEmpty(jwt) ? Ok(jwt) : NotFound(new { errorMessage = "Invalid email or password" });
		}

		[HttpPost]
		public async Task<IActionResult> Register(UserLoginDTO userLoginDTO)
		{
			await _authenticateService.Register(userLoginDTO);
			return Ok(new { successMessage = "Registered successfully" });
		}
	}
}
