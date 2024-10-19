using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Feedback;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Customer))]
    public class FeedbackController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpPost("add")]
        public async Task<IActionResult> AddFeedback([FromBody] ModifyFeedbackProductDTO addProductDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            var feedback = new FeedbackProduct
            {
                UserId = user.Id,
                ProductId = addProductDTO.productId,
                Message = addProductDTO.Message,
                Rating = addProductDTO.Rating,
                CreationDate = DateTime.Now
            };
            feedback.TryValidate();

            await _unitOfWork.FeedbackProductRepository.AddAsync(feedback);
            await _unitOfWork.SaveChangeAsync();

            return Ok(feedback);
        }

        [HttpGet("get/{productId}")]
        public async Task<IActionResult> GetUserFeedbackOnProduct(int productId)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            var feedback = await _unitOfWork.FeedbackProductRepository.GetByUserIdAndProductId(user.Id, productId);
            return Ok(feedback);
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateFeedback([FromBody] ModifyFeedbackProductDTO modifyFeedbackProductDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            var feedback = await _unitOfWork.FeedbackProductRepository
                .GetByUserIdAndProductId(user.Id, modifyFeedbackProductDTO.productId) ?? throw new DataNotFoundException("Feedback not found.");

            feedback.Message = modifyFeedbackProductDTO.Message;
            feedback.Rating = modifyFeedbackProductDTO.Rating;
            feedback.ModificationDate = DateTime.Now;

            feedback.TryValidate();

            _unitOfWork.FeedbackProductRepository.Update(feedback);

            await _unitOfWork.SaveChangeAsync();

            return Ok(feedback);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteFeedback([FromBody] int productId)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            var feedback = await _unitOfWork.FeedbackProductRepository
                .GetByUserIdAndProductId(user.Id, productId) ?? throw new DataNotFoundException("Feedback not found.");

            _unitOfWork.FeedbackProductRepository.Remove(feedback);

            await _unitOfWork.SaveChangeAsync();

            return Ok("Feedback deleted successfully.");
        }
    }
}
