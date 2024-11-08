using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class ProductController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            string[] includes = ["SubCategory", "SubCategory.Category", "Feedbacks"];
            var products = await _unitOfWork.ProductRepository.GetAllAsync(includes);

            return Ok(products);
        }

        [HttpGet("price-range")]
        public async Task<IActionResult> GetPriceRange()
        {
            var products = await _unitOfWork.ProductRepository.GetAllAsync();
            var priceRange = new
            {
                minPrice = products.Count() > 0 ? products.Min(x => x.Price) : 0,
                maxPrice = products.Count() > 0 ? products.Max(x => x.Price) : 0,
            };
            return Ok(priceRange);
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> Detail(int id)
        {
            string[] includes = ["SubCategory", "SubCategory.Category", "Feedbacks", "Feedbacks.User"];
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id, includes);

            return product != null ? Ok(product) : throw new DataNotFoundException("Product not found");
        }

        [HttpGet("get-similar")]
        public async Task<IActionResult> GetSimilar(string categoryName)
        {
            var similarProduct = await _unitOfWork.ProductRepository.GetRandom10ProductsByCategoryName(categoryName);
            return Ok(similarProduct);
        }

        [HttpGet("get-popular")]
        public async Task<IActionResult> GetPopular()
        {
            int minimumFeedbackCount = 2;
            double minimumAverageRating = 4;
            var popularProduct = await _unitOfWork.ProductRepository.Get4HighestProductByPopularityScore(minimumFeedbackCount, minimumAverageRating);
            return Ok(popularProduct);
        }
    }
}
