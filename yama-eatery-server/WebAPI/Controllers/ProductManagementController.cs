using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using WebAPI.DTOs.Product;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class ProductManagementController(IUnitOfWork _unitOfWork) : ApiController
    {

        [HttpPost("add")]
        public async Task<IActionResult> AddProduct(AddProductDTO addProductDTO)
        {
            List<string> image = [];
            foreach (var imageFile in addProductDTO.ImageFiles)
            {
                var imageName = await ImageUtil.SaveImageAsync(nameof(Product), null, imageFile);
                if (imageName != null)
                {
                    image.Add(imageName);
                }
            }

            var subCategory = await _unitOfWork.SubCategoryRepository.GetByIdAsync(addProductDTO.SubCategoryId);

            if (subCategory == null)
            {
                return NotFound("SubCategory not found.");
            }

            var product = new Product
            {
                Image = image,
                Name = addProductDTO.Name,
                Description = addProductDTO.Description,
                Price = addProductDTO.Price,
                StockQuantity = addProductDTO.StockQuantity,
                SubCategory = subCategory
            };

            await _unitOfWork.ProductRepository.AddAsync(product);
            await _unitOfWork.SaveChangeAsync();

            return Ok(product);
        }


        [HttpGet("product")]
        public async Task<IActionResult> GetAll()
        {
            string[] includes = ["SubCategory", "SubCategory.Category"];
            var products = await _unitOfWork.ProductRepository.GetAllAsync(includes);

            return Ok(products);
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveProduct(int productId)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);

            _unitOfWork.ProductRepository.Remove(product);

            await _unitOfWork.SaveChangeAsync();

            return Ok("Product is removed");
        }

        [HttpPost("restock")]
        public async Task<IActionResult> RestockProduct(int productId, int stockQuantity)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);

            if (product == null)
            {
                throw new DataNotFoundException("Product is not found");
            }

            product.StockQuantity = stockQuantity;

            _unitOfWork.ProductRepository.Update(product);

            await _unitOfWork.SaveChangeAsync();
            return Ok(new { message = $"Product restocked successfully. New stock quantity: {product.StockQuantity}" });
        }




    }
}
