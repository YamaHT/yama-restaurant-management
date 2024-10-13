using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Feedback;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class FeedbackController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> Index([FromQuery] ProductFeedbackDTO productFeedbackDTO)
        {
            var feedbacks = await _unitOfWork.FeedbackProductRepository.GetByUserIdAndProductId(productFeedbackDTO.userId, productFeedbackDTO.productId);

            if (feedbacks == null)
            {
                throw new DataNotFoundException("Feedback Detail not found");
            }

            return Ok(feedbacks);
        }
    }
}
