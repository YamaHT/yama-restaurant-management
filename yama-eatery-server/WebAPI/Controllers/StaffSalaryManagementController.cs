using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Staff;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

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

        [HttpPost("update-net-salary")]
        public async Task<IActionResult> UpdateNetSalary([FromBody] PaymentStaffSalaryDTO paymentStaffSalaryDTO)
        {
            string[] includes = [ "Position", "Attendances"];

            var employee = await _unitOfWork.EmployeeRepository.GetByIdAsync(paymentStaffSalaryDTO.EmployeeId, includes);

            if (employee == null)
            {
                throw new DataNotFoundException("Employee not found");
            }

            var attendanceInMonth = employee.Attendances.Where(x => x.Date.Month == paymentStaffSalaryDTO.Month).ToList();
            int totalLateArrival = attendanceInMonth.Count(x => x.LateArrival);
            int totalEarlyLeave = attendanceInMonth.Count(x => x.EarlyLeave);

            var deductions = (totalLateArrival + totalEarlyLeave) * 50;
            var salary = new Salary
            {
                Employee = employee,
                PayDay = DateOnly.FromDateTime(DateTime.Now),
                Deductions = deductions,
                NetSalary = employee.Position.HourlyWage * attendanceInMonth.Sum(x => x.WorkHours) - deductions
            };

             _unitOfWork.SalaryRepository.Update(salary);
            await _unitOfWork.SaveChangeAsync();

            return Ok(salary);
                  
        }
    }
}
