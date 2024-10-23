using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;
using System.Linq;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Customer))]
    public class VoucherController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var vouchers = await _unitOfWork.VoucherRepository.GetAllAsync();
            var validVouchers = vouchers.Where(v => v.Quantity > 0 && v.ExpiredDate > DateOnly.FromDateTime(DateTime.Now)).ToList();

            return Ok(validVouchers);
        }

        [HttpPost("receive")]
        public async Task<IActionResult> ReceiveVoucher([FromBody] int voucherId)
        {

            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(voucherId);

            if (voucher.Quantity <= 0)
            {
                throw new DataNotFoundException("Voucher is out of stock");
            }

            var userVoucher = new UserVoucher
            {
                UserId = user.Id,
                VoucherId = voucherId,
            };

            await _unitOfWork.UserVoucherRepository.AddAsync(userVoucher);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }
    }
}
