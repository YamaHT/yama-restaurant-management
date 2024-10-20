using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Customer))]
    public class BookingController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("booked-daypart")]
        public async Task<IActionResult> GetBookedDayPartOfTable(int tableId, DateOnly date)
        {
            var listDayPart = await _unitOfWork.BookingRepository.GetAllBookedDayPartOfTableInDateAsync(tableId, date);
            return Ok(listDayPart);
        }

        [HttpGet("valid-vouchers")]
        public async Task<IActionResult> GetValidVoucher()
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            var validUserVoucher = await _unitOfWork.UserVoucherRepository.GetValidUserVouchersOfUserId(user.Id);
            return Ok(validUserVoucher);
        }
    }
}
