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
            var validVouchers = vouchers
                .Where(v => v.Quantity > 0 && v.ExpiredDate > DateOnly.FromDateTime(DateTime.Now)).ToList();

            return Ok(validVouchers);
        }


        [HttpPost("redeem")]
        public async Task<IActionResult> RedeemVoucher([FromBody]int voucherId)  
        {

            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext, ["UserVouchers"]);
 
            var voucher = await _unitOfWork.VoucherRepository.GetByIdAsync(voucherId);

            var userVouchers = await _unitOfWork.UserRepository.GetByIdAsync(user.Id);

            if (voucher.Quantity <= 0)
            {
                throw new DataNotFoundException("Voucher is out of stock.");
            }

            if (userVouchers.UserVouchers.Any(uv => uv.VoucherId == voucherId))
            {
                throw new DataNotFoundException("Voucher not Redeem ");
            }
            else
            {
                var myVoucher = new UserVoucher
                {
                    UserId = user.Id,
                    VoucherId = voucherId,
                    IsUsed = false,
                };
                voucher.Quantity--;

                _unitOfWork.VoucherRepository.Update(voucher);

                await _unitOfWork.UserVoucherRepository.AddAsync(myVoucher);

                await _unitOfWork.SaveChangeAsync();

                return Ok(true);
            }
        }
    }
}
