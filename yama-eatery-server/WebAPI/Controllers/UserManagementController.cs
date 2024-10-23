using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Models.Enums;
using WebAPI.Repositories;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class UserManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("view-membership-register")]
        public async Task<IActionResult> ViewMembershipRegister()
        {
            var user = await _unitOfWork.UserRepository.GetAllAsync(["Membership"]);

            var membership = user.Where(x => x.Membership?.MembershipStatus == MembershipStatusEnum.Requesting.ToString())
                .Select(x => new { x.Id, x.Name, x.Phone });
            return Ok(membership);
        }

        [HttpPost("membership/approve")]
        public async Task<IActionResult> ApproveMembership([FromBody] int id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id, ["Membership"]);

            user.Membership.MembershipStatus = MembershipStatusEnum.Active.ToString();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return Ok(new { success = "Membership approve successfully." });
        }

        [HttpPost("membership/deny")]
        public async Task<IActionResult> DenyMembership([FromBody] int id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id, ["Membership"]);

            user.Membership.MembershipStatus = MembershipStatusEnum.Inactive.ToString();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return Ok(new { success = "Membership deny successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var user = await _unitOfWork.UserRepository.GetAllAsync();
            return Ok(user);
        }

    }
}
