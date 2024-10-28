using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> GetAllStaffSalaryInMonth(int month)
        {
            string[] includes = ["Attendances", "Salaries"];
            var employees = await _unitOfWork.EmployeeRepository.GetAllStaffsAsync(includes);

            List<GetStaffSalaryDTO> getStaffSalaryDTO = employees.Select(x => new GetStaffSalaryDTO
            {
                Id = x.Id,
                Name = x.Name,
                WorkHours = x.Attendances.Where(x => x.Date.Month == month).Sum(x => x.WorkHours),
                NumberOfFaults = x.Attendances.Where(a => a.Date.Month == month).Sum(a => (a.LateArrival ? 1 : 0) + (a.EarlyLeave ? 1 : 0)),
                NetSalary = x.Salaries.FirstOrDefault(x => x.PayDay.HasValue && x.PayDay.Value.Month == month)?.NetSalary ?? 0,
                PayDay = x.Salaries.FirstOrDefault(x => x.PayDay.HasValue && x.PayDay.Value.Month == month)?.PayDay
            }).ToList();

            return Ok(getStaffSalaryDTO);
        }

        [HttpPost("pay-salary")]
        public async Task<IActionResult> PaySalary([FromBody] PaymentStaffSalaryDTO paymentStaffSalaryDTO)
        {
            string[] includes = ["Position", "Attendances", "Salaries"];

            var employee = await _unitOfWork.EmployeeRepository.GetByIdAsync(paymentStaffSalaryDTO.EmployeeId, includes);

            if (employee == null)
            {
                throw new DataNotFoundException("Employee not found");
            }

            if (employee.Salaries.Any(x => x.PayDay.HasValue && x.PayDay.Value.Month == paymentStaffSalaryDTO.Month))
            {
                throw new DataConflictException("This month has already paid");
            }

            var attendanceInMonth = employee.Attendances.Where(x => x.Date.Month == paymentStaffSalaryDTO.Month).ToList();
            int totalLateArrival = attendanceInMonth.Count(x => x.LateArrival);
            int totalEarlyLeave = attendanceInMonth.Count(x => x.EarlyLeave);

            var deductions = (totalLateArrival + totalEarlyLeave) * 50;
            var salary = new Salary
            {
                Employee = employee,
                PayDay = paymentStaffSalaryDTO.Month == DateTime.Now.Month
                            ? DateOnly.FromDateTime(DateTime.Now)
                            : DateOnly.FromDateTime(new DateTime(DateTime.Now.Year, paymentStaffSalaryDTO.Month,
                                                                 DateTime.DaysInMonth(DateTime.Now.Year, paymentStaffSalaryDTO.Month))),
                Deductions = deductions,
                NetSalary = employee.Position.HourlyWage * attendanceInMonth.Sum(x => x.WorkHours) - deductions
            };

            await _unitOfWork.SalaryRepository.AddAsync(salary);
            await _unitOfWork.SaveChangeAsync();
            await Task.WhenAll();

            return RedirectToAction("GetAllStaffSalaryInMonth", new { month = paymentStaffSalaryDTO.Month });
        }
    }
}
