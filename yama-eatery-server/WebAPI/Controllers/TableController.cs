using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    public class TableController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllTable()
        {
            var tables = await _unitOfWork.TableRepository.GetAllAsync();
            return Ok(tables);
        }
        [HttpGet("Detail/{id}")]
        public async Task<IActionResult> Detail(int id)
        {
            var table = await _unitOfWork.TableRepository.GetByIdAsync(id);

            if (table == null)
            {
                throw new DataNotFoundException("Table Detail not found");
            }

            return Ok(table);
        }
    }
}
