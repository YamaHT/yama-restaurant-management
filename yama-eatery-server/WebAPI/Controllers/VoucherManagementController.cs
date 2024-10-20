using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Product;
using WebAPI.DTOs.Voucher;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class VoucherManagementController(IUnitOfWork _unitOfWork) : ApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetAllVoucher()
        {
            var vouchers = await _unitOfWork.VoucherRepository.GetAllAsync();
            var validVouchers = vouchers
                .Where(v => v.Quantity > 0 && v.ExpiredDate > DateOnly.FromDateTime(DateTime.Now)).ToList();

            return Ok(validVouchers);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddVoucher([FromForm] CreateVoucherDTO createVoucherDTO)
        {
            var newVoucher = new Voucher
            {
                Name = createVoucherDTO.Name,
                Description = createVoucherDTO.Description,
                ExpiredDate = DateOnly.FromDateTime(createVoucherDTO.ExpiredDate),
                ReducedPercent = createVoucherDTO.ReducedPercent,
                MaxReducing = createVoucherDTO.MaxReducing,
                Quantity = createVoucherDTO.Quantity,
                Image = await ImageUtil.AddImageAsync(nameof(Voucher), createVoucherDTO.Image),
            };

            newVoucher.TryValidate();

            await _unitOfWork.VoucherRepository.AddAsync(newVoucher);
            await _unitOfWork.SaveChangeAsync();

            return CreatedAtAction(nameof(GetAllVoucher), new { id = newVoucher.Id }, newVoucher);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateVoucher(int id, [FromBody] UpdateVoucherDTO updateVoucherDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            // Kiểm tra nếu DTO không hợp lệ
            if (updateVoucherDTO == null)
            {
                return BadRequest("Voucher data is required.");
            }

            // Tìm voucher theo ID
            var existingVoucher = await _unitOfWork.VoucherRepository.GetByIdAsync(id);
            if (existingVoucher == null)
            {
                return NotFound($"Voucher with ID {id} not found.");
            }

            // Cập nhật thông tin voucher
            existingVoucher.Name = updateVoucherDTO.Name;
            existingVoucher.Description = updateVoucherDTO.Description;
            existingVoucher.ExpiredDate = DateOnly.FromDateTime(updateVoucherDTO.ExpiredDate); // Chuyển đổi nếu cần
            existingVoucher.ReducedPercent = updateVoucherDTO.ReducedPercent;
            existingVoucher.MaxReducing = updateVoucherDTO.MaxReducing;
            existingVoucher.Quantity = updateVoucherDTO.Quantity;
            existingVoucher.Image = updateVoucherDTO.Image;

            // Validate voucher (nếu cần)
            existingVoucher.TryValidate();

            // Cập nhật voucher trong database
            _unitOfWork.VoucherRepository.Update(existingVoucher);
            await _unitOfWork.SaveChangeAsync();

            return NoContent(); // Trả về 204 No Content khi cập nhật thành công
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveVoucher(int id)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            // Tìm voucher theo ID
            var existingVoucher = await _unitOfWork.VoucherRepository.GetByIdAsync(id);
            if (existingVoucher == null)
            {
                return NotFound($"Voucher with ID {id} not found.");
            }

            // Xóa voucher khỏi database
            _unitOfWork.VoucherRepository.Remove(existingVoucher);
            await _unitOfWork.SaveChangeAsync();

            return NoContent(); // Trả về 204 No Content khi xóa thành công
        }

    }
}
