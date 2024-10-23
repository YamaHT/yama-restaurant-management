using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Staff;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils.Exceptions;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class StaffInformationManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("staff-information-list")]
        public async Task<IActionResult> GetAllStaff()
        {
            var employee = await _unitOfWork.EmployeeRepository.GetAllStaffs();
            return Ok(employee);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddStaff([FromForm] AddStaffInformationDTO addStaffDTO)
        {
            if (await _unitOfWork.EmployeeRepository.CheckEmailExistedAsync(addStaffDTO.Email))
            {
                throw new DataConflictException("Email already exists");
            }

            var employee = new Employee
            {
                Image = await ImageUtil.AddImageAsync(nameof(Employee), addStaffDTO.ImageFiles),
                Name = addStaffDTO.Name,
                Email = addStaffDTO.Email,
                Password = addStaffDTO.Password,
                Birthday = addStaffDTO.Birthday,
                Phone = addStaffDTO.Phone,
                Gender = addStaffDTO.Gender,
                Position = await _unitOfWork.PositionRepository.GetByIdAsync(int.Parse(PositionEnum.Staff.GetEnumDisplayName()))
            };

            employee.TryValidate();

            employee.Password = CryptoUtil.EncryptPassword(employee.Password);

            await _unitOfWork.EmployeeRepository.AddAsync(employee);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("StaffInformationList");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateStaff([FromForm] UpdateStaffInformationDTO updateStaffDTO)
        {
            var employee = await _unitOfWork.EmployeeRepository.GetByIdAsync(updateStaffDTO.EmployeeId);
            if (employee == null)
            {
                throw new DataNotFoundException("Employee not found");
            }

            employee.Birthday = updateStaffDTO.Birthday;
            employee.Gender = updateStaffDTO.Gender;
            employee.Image = await ImageUtil.UpdateImageAsync(nameof(Employee), employee.Image, updateStaffDTO.ImageFile);
            employee.Name = updateStaffDTO.Name;
            employee.Phone = updateStaffDTO.Phone;
            employee.TryValidate();

            _unitOfWork.EmployeeRepository.Update(employee);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("StaffInformationList");
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteStaff([FromBody] int employeeId)
        {
            var employee = await _unitOfWork.EmployeeRepository.GetByIdAsync(employeeId);
            if (employee == null)
            {
                throw new DataNotFoundException("Employee is not found");
            }

            _unitOfWork.EmployeeRepository.Remove(employee);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("StaffInformationList");
        }
    }
}
