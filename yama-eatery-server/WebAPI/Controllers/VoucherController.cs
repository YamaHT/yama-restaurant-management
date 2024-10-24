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
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["UserVouchers"]);
            var userVoucher = user.UserVouchers.Select(x => x.Voucher).ToList();

            var vouchers = await _unitOfWork.VoucherRepository.GetAllValidVoucherAsync();
            var voucherRemain = vouchers.Except(userVoucher).ToList();
            return Ok(voucherRemain);
        }

        [HttpPost("receive")]
        public async Task<IActionResult> ReceiveVoucher([FromBody] int voucherId)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["UserVouchers", "UserVouchers.Voucher"]);

            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(voucherId);
            if (voucher.Quantity <= 0)
            {
                throw new DataNotFoundException("Voucher is out of stock");
            }

            if (user.UserVouchers.Select(x => x.Voucher).Contains(voucher))
            {
                throw new DataConflictException("This voucher has been received");
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
