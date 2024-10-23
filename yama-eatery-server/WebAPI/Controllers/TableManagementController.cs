using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs.Table;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class TableManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tables = await _unitOfWork.TableRepository.GetAllWithDeletedAsync();

            return Ok(tables);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTable([FromForm] AddTableDTO addTableDTO)
        {
            List<string> image = [];
            foreach (var imageFile in addTableDTO.ImageFiles)
            {
                var imageName = await ImageUtil.AddImageAsync(nameof(Table), imageFile);
                if (imageName != null)
                {
                    image.Add(imageName);
                }
            }

            var table = new Table
            {
                Image = image,
                Floor = addTableDTO.Floor,
                Type = addTableDTO.Type,
            };

            table.TryValidate();

            await _unitOfWork.TableRepository.AddAsync(table);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateTable([FromForm] UpdateTableDTO updateTableDTO)
        {
            var table = await _unitOfWork.TableRepository.GetByIdAsync(updateTableDTO.TableId);
            if (table == null)
            {
                throw new DataNotFoundException("Table not found");
            }

            var listImage = updateTableDTO.RemainImages;
            foreach (var item in updateTableDTO.DeletedImages)
            {
                ImageUtil.DeleteImageAsync(nameof(Table), item);
            }

            foreach (var item in updateTableDTO.ImageFiles)
            {
                var imageName = await ImageUtil.AddImageAsync(nameof(Table), item);
                if (imageName != null)
                {
                    listImage.Add(imageName);
                }
            }

            table.Floor = updateTableDTO.Floor;
            table.Type = updateTableDTO.Type;
            table.Image = listImage;

            table.TryValidate();

            _unitOfWork.TableRepository.Update(table);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveTable([FromBody] int tableId)
        {
            var table = await _unitOfWork.TableRepository.GetByIdAsync(tableId);
            if (table == null)
            {
                throw new DataNotFoundException("Table not found");
            }

            _unitOfWork.TableRepository.Remove(table);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpPost("restore")]
        public async Task<IActionResult> RestoreTable([FromBody] int tableId)
        {
            var table = await _unitOfWork.TableRepository.GetByIdAsync(tableId);

            if (table == null)
            {
                throw new DataNotFoundException("Table not found");
            }

            _unitOfWork.TableRepository.Restore(table);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }
    }
}
