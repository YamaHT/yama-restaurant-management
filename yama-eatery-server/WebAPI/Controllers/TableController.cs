using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class TableController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tables = await _unitOfWork.TableRepository.GetAllAsync();
            return Ok(tables);
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> Detail(int id)
        {
            var table = await _unitOfWork.TableRepository.GetByIdAsync(id);
            return table != null ? Ok(table) : throw new DataNotFoundException("Table not found");
        }
    }
}
