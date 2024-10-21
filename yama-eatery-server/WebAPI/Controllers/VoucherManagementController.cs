using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Voucher;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;


namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class VoucherManagementController(IUnitOfWork _unitOfWork) : ApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetAllVoucher()
        {
            var vouchers = await _unitOfWork.VoucherRepository.GetAllWithDeletedAsync();
            return Ok(vouchers);
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

            return Ok(newVoucher);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> UpdateVoucher(int id, [FromForm] UpdateVoucherDTO updateVoucherDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            if (updateVoucherDTO == null)
            {
                return BadRequest("Voucher data is required.");
            }

            var existingVoucher = await _unitOfWork.VoucherRepository.GetByIdAsync(id);
            if (existingVoucher == null)
            {
                throw new DataNotFoundException($"Voucher with ID {id} not found.");
            }


            existingVoucher.Name = updateVoucherDTO.Name;
            existingVoucher.Description = updateVoucherDTO.Description;
            existingVoucher.ExpiredDate = DateOnly.FromDateTime(updateVoucherDTO.ExpiredDate);
            existingVoucher.ReducedPercent = updateVoucherDTO.ReducedPercent;
            existingVoucher.MaxReducing = updateVoucherDTO.MaxReducing;
            existingVoucher.Quantity = updateVoucherDTO.Quantity;
            existingVoucher.Image = await ImageUtil.AddImageAsync(nameof(Voucher), updateVoucherDTO.Image);

            existingVoucher.TryValidate();

            _unitOfWork.VoucherRepository.Update(existingVoucher);
            await _unitOfWork.SaveChangeAsync();
            return Ok(existingVoucher);

        }

        [HttpPost("remove/{id}")]
        public async Task<IActionResult> RemoveVoucher(int id)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            var existingVoucher = await _unitOfWork.VoucherRepository.GetByIdAsync(id);
            if (existingVoucher == null)
            {
                return NotFound($"Voucher with ID {id} not found.");
            }
            _unitOfWork.VoucherRepository.Remove(existingVoucher);
            await _unitOfWork.SaveChangeAsync();

            return Ok(existingVoucher);
        }

    }
}
