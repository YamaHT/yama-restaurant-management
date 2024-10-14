using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    public class EnumController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> Category()
        {
            string[] include = ["SubCategories"];
            var categories = await _unitOfWork.CategoryRepository.GetAllAsync(include);
            return Ok(categories);
        }
    }
}
