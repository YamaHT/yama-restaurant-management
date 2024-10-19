using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

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
    }
}
