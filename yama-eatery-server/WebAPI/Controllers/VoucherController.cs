using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    public class VoucherController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllVouchers(int? voucherId = null, bool? IsDeleted = null, string name = null, DateOnly? expiredDate = null, int? reducedPercent = null)
        {
            var vouchers = await _unitOfWork.VoucherRepository.GetAllAsync();
            var validVouchers = vouchers
                .Where(v => v.Quantity > 0 && v.ExpiredDate > DateOnly.FromDateTime(DateTime.Now))
                .AsQueryable();
            if (voucherId.HasValue)
            {
                validVouchers = validVouchers.Where(v => v.Id == voucherId.Value);
            }
            if (IsDeleted.HasValue)
            {
                validVouchers = validVouchers.Where(v => v.IsDeleted == IsDeleted.Value);
            }
            if (!string.IsNullOrEmpty(name))
            {
                validVouchers = validVouchers.Where(v => v.Name.IndexOf(name, StringComparison.OrdinalIgnoreCase) >= 0);
            }
            if (expiredDate.HasValue)
            {
                validVouchers = validVouchers.Where(v => v.ExpiredDate <= expiredDate.Value);
            }
            if (reducedPercent.HasValue)
            {
                validVouchers = validVouchers.Where(v => v.ReducedPercent >= reducedPercent.Value);
            }
            var resultVouchers = validVouchers.ToList();
            if (!resultVouchers.Any())
            {
                return NotFound("No valid vouchers found.");
            }
            return Ok(resultVouchers);
        }
    }
}
