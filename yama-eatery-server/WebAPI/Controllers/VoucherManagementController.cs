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
        public async Task<IActionResult> GetAll()
        {
            var vouchers = await _unitOfWork.VoucherRepository.GetAllWithDeletedAsync();
            return Ok(vouchers);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddVoucher([FromForm] CreateVoucherDTO createVoucherDTO)
        {
            var voucher = new Voucher
            {
                Name = createVoucherDTO.Name,
                Description = createVoucherDTO.Description,
                ExpiredDate = DateOnly.FromDateTime(createVoucherDTO.ExpiredDate),
                ReducedPercent = createVoucherDTO.ReducedPercent,
                MaxReducing = createVoucherDTO.MaxReducing,
                Quantity = createVoucherDTO.Quantity,
                Image = await ImageUtil.AddImageAsync(nameof(Voucher), createVoucherDTO.Image),
            };

            voucher.TryValidate();

            await _unitOfWork.VoucherRepository.AddAsync(voucher);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateVoucher([FromForm] UpdateVoucherDTO updateVoucherDTO)
        {
            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(updateVoucherDTO.Id);
            if (voucher == null)
            {
                throw new DataNotFoundException("Voucher not found");
            }

            voucher.Name = updateVoucherDTO.Name;
            voucher.Description = updateVoucherDTO.Description;
            voucher.ExpiredDate = DateOnly.FromDateTime(updateVoucherDTO.ExpiredDate);
            voucher.ReducedPercent = updateVoucherDTO.ReducedPercent;
            voucher.MaxReducing = updateVoucherDTO.MaxReducing;
            voucher.Quantity = updateVoucherDTO.Quantity;
            if (updateVoucherDTO.Image != null)
            {
                voucher.Image = await ImageUtil.UpdateImageAsync(nameof(Voucher), voucher.Image, updateVoucherDTO.Image);
            }

            voucher.TryValidate();

            _unitOfWork.VoucherRepository.Update(voucher);
            await _unitOfWork.SaveChangeAsync();
            return RedirectToAction("GetAll");
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteVoucher([FromBody] int id)
        {
            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(id);
            if (voucher == null)
            {
                throw new DataNotFoundException("Voucher not found");
            }

            _unitOfWork.VoucherRepository.Remove(voucher);
            await _unitOfWork.SaveChangeAsync();
            return RedirectToAction("GetAll");
        }

        [HttpPost("restore")]
        public async Task<IActionResult> RestoreVoucher([FromBody] int id)
        {
            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(id);
            if (voucher == null)
            {
                throw new DataNotFoundException("Product is not found");
            }

            _unitOfWork.VoucherRepository.Restore(voucher);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }
    }
}
