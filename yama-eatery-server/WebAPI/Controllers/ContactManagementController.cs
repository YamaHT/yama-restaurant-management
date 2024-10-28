using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.User;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.EmailSender;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class ContactManagementController(IUnitOfWork _unitOfWork, IConfiguration _configuration) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contact = await _unitOfWork.ContactRepository.GetAllAsync();
            return Ok(contact.Where(x => string.IsNullOrEmpty(x.Respond) && !x.IsIgnored).ToList());
        }

        [HttpPost("respond")]
        public async Task<IActionResult> Respond([FromBody] RespondUserContactDTO contactDTO)
        {
            var contact = await _unitOfWork.ContactRepository.GetByIdAsync(contactDTO.Id, ["User"]);
            if (contact == null)
            {
                throw new DataNotFoundException("Contact not found");
            }

            contact.Respond = contactDTO.Respond;
            contact.TryValidate();

            _unitOfWork.ContactRepository.Update(contact);
            await _unitOfWork.SaveChangeAsync();

            _ = Task.Run(() => SendMailUtil.SendMailContactAsync(_configuration, contact, contactDTO.Respond));
            return RedirectToAction("GetAll");
        }

        [HttpPost("ignore")]
        public async Task<IActionResult> Ignore([FromBody] int id)
        {
            var contact = await _unitOfWork.ContactRepository.GetByIdAsync(id);
            if (contact == null)
            {
                throw new DataNotFoundException("Contact not found");
            }

            contact.IsIgnored = true;

            _unitOfWork.ContactRepository.Update(contact);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }
    }
}
