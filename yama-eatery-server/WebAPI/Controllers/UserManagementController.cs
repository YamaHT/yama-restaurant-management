using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class UserManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var user = await _unitOfWork.UserRepository.GetAllAsync(["Membership"]);
            return Ok(user);
        }

        [HttpGet("membership")]
        public async Task<IActionResult> MembershipRegister()
        {
            var user = await _unitOfWork.UserRepository.GetAllAsync(["Membership"]);

            var userRequestMembership = user.Where(x => x.Membership?.MembershipStatus == MembershipStatusEnum.Requesting.ToString())
                                 .Select(x => new { x.Id, x.Name, x.Phone });
            return Ok(userRequestMembership);
        }

        [HttpPost("membership/approve")]
        public async Task<IActionResult> ApproveMembership([FromBody] int id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id, ["Membership"]);
            if (user == null)
            {
                throw new DataNotFoundException("User not found");
            }

            user.Membership.MembershipStatus = MembershipStatusEnum.Active.ToString();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("MembershipRegister");
        }

        [HttpPost("membership/deny")]
        public async Task<IActionResult> DenyMembership([FromBody] int id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id, ["Membership"]);
            if (user == null)
            {
                throw new DataNotFoundException("User not found");
            }

            user.Membership.MembershipStatus = MembershipStatusEnum.Inactive.ToString();

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("MembershipRegister");
        }
    }
}
