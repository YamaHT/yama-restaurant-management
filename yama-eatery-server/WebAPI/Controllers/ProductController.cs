using Application;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    public class ProductController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string[] include = [nameof(Category)];
            return Ok(await _unitOfWork.ProductRepository.GetAllAsync(include));
        }
    }
}
