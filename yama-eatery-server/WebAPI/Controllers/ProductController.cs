using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class ProductController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllProduct()
        {
            string[] includes = ["SubCategory", "SubCategory.Category", "Feedbacks"];
            var products = await _unitOfWork.ProductRepository.GetAllAsync(includes);
            return Ok(products);
        }

        [HttpGet("Detail/{id}")]
        public async Task<IActionResult> Detail(int id)
        {
            string[] includes = { "SubCategory", "SubCategory.Category", "Feedbacks" };
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id, includes);

            if (product == null)
            {
                throw new DataNotFoundException("Product not found");
            }

            return Ok(product);
        }

        [HttpGet]
        public async Task<IActionResult> GetSimilar(string categoryName)
        {
            var similarProduct = await _unitOfWork.ProductRepository.GetRandom10ProductsByCategoryName(categoryName);
                  return Ok(similarProduct);
        }
    }
}
