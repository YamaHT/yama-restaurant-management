using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    public class EnumController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("category")]
        public async Task<IActionResult> Category()
        {
            string[] include = ["SubCategories"];
            var categories = await _unitOfWork.CategoryRepository.GetAllAsync(include);
            return Ok(categories);
        }

        [HttpGet("table-type")]
        public async Task<IActionResult> TableType()
        {
            var types = Enum.GetValues(typeof(TypeEnum)).Cast<TypeEnum>().Select(t => t.ToString());
            return Ok(types);
        }
    }
}
