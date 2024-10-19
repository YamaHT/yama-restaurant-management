using Microsoft.AspNetCore.Authorization;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Staff))]
    public class BookingManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
    }
}
