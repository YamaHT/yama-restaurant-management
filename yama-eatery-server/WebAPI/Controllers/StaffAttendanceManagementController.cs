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
    public class StaffAttendanceManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllTodayAttendances()
        {
            var attendance = await _unitOfWork.AttendanceRepository.GetAllTodayAttendanceAsync();
            return Ok(attendance);
        }

        [HttpGet("not-in-today")]
        public async Task<IActionResult> GetAllStaffNotInTodayAttendance()
        {
            var staffs = await _unitOfWork.AttendanceRepository.GetAllStaffNotInTodayAttendanceAsync();
            return Ok(staffs);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddStaffAttendance([FromBody] int employeeId)
        {
            var employee = await _unitOfWork.EmployeeRepository.GetByIdAsync(employeeId);
            if (employee == null)
            {
                throw new DataNotFoundException("Employee is not found");
            }

            var attendance = new Attendance
            {
                Date = DateOnly.FromDateTime(DateTime.Now),
                Employee = employee,
                WorkHours = 0
            };

            await _unitOfWork.AttendanceRepository.AddAsync(attendance);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAllTodayAttendances");
        }

        [HttpPost("check-in")]
        public async Task<IActionResult> CheckInAttendance([FromBody] int id)
        {
            var attendance = await _unitOfWork.AttendanceRepository.GetByIdAsync(id);
            if (attendance == null)
            {
                throw new DataNotFoundException("Attendance not found");
            }

            if (attendance.CheckInTime != TimeOnly.MinValue)
            {
                throw new DataConflictException("Attendance has been checked in");
            }

            attendance.CheckInTime = TimeOnly.FromDateTime(DateTime.Now);

            _unitOfWork.AttendanceRepository.Update(attendance);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAllTodayAttendances");
        }

        [HttpPost("check-out")]
        public async Task<IActionResult> CheckOutAttendance([FromBody] int id)
        {
            var attendance = await _unitOfWork.AttendanceRepository.GetByIdAsync(id);
            if (attendance == null)
            {
                throw new DataNotFoundException("Attendance not found");
            }

            if (attendance.CheckOutTime != TimeOnly.MinValue)
            {
                throw new DataConflictException("Attendance has been checked out");
            }

            attendance.CheckOutTime = TimeOnly.FromDateTime(DateTime.Now);

            var workDuration = attendance.CheckOutTime.ToTimeSpan() - attendance.CheckInTime.ToTimeSpan();
            attendance.WorkHours = workDuration.TotalHours;

            _unitOfWork.AttendanceRepository.Update(attendance);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAllTodayAttendances");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateStaffAttendance([FromBody] UpdateStaffAttendanceDTO staffAttendanceDTO)
        {
            var attendance = await _unitOfWork.AttendanceRepository.GetByIdAsync(staffAttendanceDTO.Id);
            if (attendance == null)
            {
                throw new DataNotFoundException("Attendance not found");
            }

            var checkInTime = TimeOnly.Parse(staffAttendanceDTO.CheckInTime);
            var checkOutTime = TimeOnly.Parse(staffAttendanceDTO.CheckOutTime);
            var workDuration = checkOutTime.ToTimeSpan() - checkInTime.ToTimeSpan();

            attendance.CheckInTime = checkInTime;
            attendance.CheckOutTime = checkOutTime;
            attendance.WorkHours = workDuration.TotalHours;
            attendance.LateArrival = staffAttendanceDTO.LateArrival;
            attendance.EarlyLeave = staffAttendanceDTO.EarlyLeave;

            _unitOfWork.AttendanceRepository.Update(attendance);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAllTodayAttendances");
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteStaffAttendance([FromBody] int employeeId)
        {
            var employee = await _unitOfWork.AttendanceRepository.GetByIdAsync(employeeId);
            if (employee == null)
            {
                throw new DataNotFoundException("Employee not found");
            }

            _unitOfWork.AttendanceRepository.Remove(employee);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAllTodayAttendances");
        }
    }
}
