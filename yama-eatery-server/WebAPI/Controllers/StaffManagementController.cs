using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class StaffManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("staff-attendance-list")]
        public async Task<IActionResult> StaffAttendanceList()
        {
            
            var staff = await _unitOfWork.AttendanceRepository.GetAllWithDeletedAsync(["Employee"]);

            return Ok(staff);
        }

        [HttpGet("checkInTime/{id}")]
        public async Task<IActionResult> CheckInTime(int id)
        {
            var employee = await _unitOfWork.EmployeeRepository.GetByIdAsync(id );

           employee.Attendances = TimeOnly.FromDateTime(DateTime.Now);

             _unitOfWork.AttendanceRepository.Update(employee);
            await _unitOfWork.SaveChangeAsync();


            return Ok(employee);
        }

        [HttpGet("checkOutTime/{id}")]
        public async Task<IActionResult> CheckOutTime()
        {

            var staff = await _unitOfWork.AttendanceRepository.GetAllWithDeletedAsync(["Employee"]);

            return Ok(staff);
        }
    }
}