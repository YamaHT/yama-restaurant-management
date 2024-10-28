using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = "Staff, Manager")]
    public class EmployeeController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("profile")]
        public async Task<IActionResult> EmployeeProfile()
        {
            var employee = await _unitOfWork.GetEmployeeFromHttpContextAsync(HttpContext);
            return Ok(new { employee.Name, employee.Image });
        }
    }
}
