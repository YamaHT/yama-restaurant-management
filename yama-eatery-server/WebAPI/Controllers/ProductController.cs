using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Product;
using WebAPI.Models;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class ProductController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var products = await _unitOfWork.ProductRepository.GetAllAsync();
            return Ok(products);
        }

        [HttpGet]
        public async Task<IActionResult> Detail([FromQuery] ProductFilterDTO productFilterDTO)
        {
            string[] include = [nameof(Category), nameof(Product.Feedbacks)];
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(0);
            return product == null ? throw new DataNotFoundException("Product not found") : (IActionResult)Ok(product);
        }
    }
}
