using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class StaffSalaryManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllStaffSalary()
        {
            string[] includes = ["Employee", "Employee.Attendances"];

            var salary = await _unitOfWork.SalaryRepository.GetAllAsync(includes);

            return Ok(salary);
        }
    }
}
