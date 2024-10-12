using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    public class ProductController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllProduct()
        {
            string[] includes = ["SubCategory"];
            var products = await _unitOfWork.ProductRepository.GetAllAsync(includes);
            var categoies = await _unitOfWork.CategoryRepository.GetAllAsync(["SubCategories", "SubCategories.Products"]);
            return Ok(products);
        }
    }
}
