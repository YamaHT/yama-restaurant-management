using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Feedback;
using WebAPI.Models;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class FeedbackController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpPost]
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
            await _unitOfWork.FeedbackProductRepository.AddAsync(feedback);
            await _unitOfWork.SaveChangeAsync();

            return Ok(feedback);
        }

        [HttpGet("Feedback/{productId}")]
        public async Task<IActionResult> ViewFeedback(int productId)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);
            var feedback = await _unitOfWork.FeedbackProductRepository.GetByUserIdAndProductId(user.Id, productId);
            return Ok(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateFeedback([FromBody] ModifyFeedbackProductDTO modifyFeedbackProductDTO)
        {
            var user = await _unitOfWork.GetUserFromHttpContextAsync(HttpContext);

            var feedback = await _unitOfWork.FeedbackProductRepository
                .GetByUserIdAndProductId(user.Id, modifyFeedbackProductDTO.productId) ?? throw new DataNotFoundException("Feedback not found.");
           
            feedback.Message = modifyFeedbackProductDTO.Message;
            feedback.Rating = modifyFeedbackProductDTO.Rating;
            feedback.ModificationDate = DateTime.Now;

            _unitOfWork.FeedbackProductRepository.Update(feedback);

            await _unitOfWork.SaveChangeAsync();

            return Ok(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteFeedback(int productId)
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
