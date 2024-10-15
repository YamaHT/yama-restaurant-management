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
        public async Task<IActionResult> AddFeedback([FromBody] ModifyProductFeedbackDTO addProductDTO)
        {
            var feedback = new FeedbackProduct
            {
                UserId = addProductDTO.userId,
                ProductId = addProductDTO.productId,
                Message = addProductDTO.Message,
                Rating = addProductDTO.Rating,
                CreationDate = DateTime.Now
            };
            await _unitOfWork.FeedbackProductRepository.AddAsync(feedback);
            await _unitOfWork.SaveChangeAsync();
          
           return Ok(feedback);
        }
        [HttpGet]
        public async Task<IActionResult> ViewFeedback([FromQuery] ProductFeedbackDTO productFeedbackDTO)
        {
            var feedback = await _unitOfWork.FeedbackProductRepository.GetByUserIdAndProductId(productFeedbackDTO.userId, productFeedbackDTO.productId);
            return Ok(feedback);
        }


        [HttpPost]
        public async Task<IActionResult> UpdateFeedback([FromBody] ModifyProductFeedbackDTO updateFeedbackProduct)
        {
            var feedback = await _unitOfWork.FeedbackProductRepository
                .GetByUserIdAndProductId(updateFeedbackProduct.userId, updateFeedbackProduct.productId);

            if (feedback == null)
            {
                throw new DataNotFoundException("Feedback not found.");
            }

            feedback.Message = updateFeedbackProduct.Message;
            feedback.Rating = updateFeedbackProduct.Rating;
            feedback.ModificationDate = DateTime.Now;

            _unitOfWork.FeedbackProductRepository.Update(feedback); 

            await _unitOfWork.SaveChangeAsync();

            return Ok(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteFeedback([FromQuery] ProductFeedbackDTO removeProductFeedbackDTO)
        {

            var feedback = await _unitOfWork.FeedbackProductRepository
                .GetByUserIdAndProductId(removeProductFeedbackDTO.userId, removeProductFeedbackDTO.productId);

            if (feedback == null)
            {
                throw new DataNotFoundException("Feedback not found.");
            }

            _unitOfWork.FeedbackProductRepository.Remove(feedback);

            await _unitOfWork.SaveChangeAsync();

            return Ok("Feedback deleted successfully.");
        }



    }
}
