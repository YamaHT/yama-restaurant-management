using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class StatisticsManagerController(IUnitOfWork _unitOfWork) : ControllerBase
    {
    }
}
