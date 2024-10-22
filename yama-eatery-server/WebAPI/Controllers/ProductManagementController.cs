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
        public async Task<IActionResult> AddProduct([FromForm] AddProductDTO addProductDTO)
        {
            List<string> image = [];
            foreach (var imageFile in addProductDTO.ImageFiles)
            {
                var imageName = await ImageUtil.AddImageAsync(nameof(Product), imageFile);
                if (imageName != null)
                {
                    image.Add(imageName);
                }
            }

            var subCategory = await _unitOfWork.SubCategoryRepository.GetByIdAsync(addProductDTO.SubCategoryId);

            var product = new Product
            {
                Image = image,
                Name = addProductDTO.Name,
                Description = addProductDTO.Description,
                Price = addProductDTO.Price,
                StockQuantity = addProductDTO.StockQuantity,
                SubCategory = subCategory
            };

            product.TryValidate();

            await _unitOfWork.ProductRepository.AddAsync(product);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }
        [HttpPost("update")]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductDTO updateProductDTO)
        {
            var existingProduct = await _unitOfWork.ProductRepository.GetByIdAsync(updateProductDTO.ProductId);

            List<string> currentImages = existingProduct?.Image ?? new List<string>();

            List<string> updatedImages = new List<string>();
            foreach (var imageFile in updateProductDTO.ImageFiles)
            {
                var oldImageName = currentImages.FirstOrDefault(); 
                var updatedImage = await ImageUtil.UpdateImageAsync(nameof(Product), oldImageName, imageFile);

                if (updatedImage != null)
                {
                    updatedImages.Add(updatedImage);
                }

                if (oldImageName != null)
                {
                    currentImages.Remove(oldImageName); 
                }
            }

            updatedImages.AddRange(currentImages);
            var subCategory = await _unitOfWork.SubCategoryRepository.GetByIdAsync(updateProductDTO.SubCategoryId);
            existingProduct.Name = updateProductDTO.Name;
            existingProduct.Description = updateProductDTO.Description;
            existingProduct.Price = updateProductDTO.Price;
            existingProduct.StockQuantity = updateProductDTO.StockQuantity;
            existingProduct.SubCategory = subCategory;
            existingProduct.Image = updatedImages;

            _unitOfWork.ProductRepository.Update(existingProduct);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            string[] includes = ["SubCategory", "SubCategory.Category"];
            var products = await _unitOfWork.ProductRepository.GetAllWithDeletedAsync(includes);

            return Ok(products);
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveProduct([FromBody] int productId)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new DataNotFoundException("Product is not found");
            }

            _unitOfWork.ProductRepository.Remove(product);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpPost("restore")]
        public async Task<IActionResult> RestoreProduct([FromBody] int productId)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);

            if (product == null)
            {
                throw new DataNotFoundException("Product is not found");
            }

            _unitOfWork.ProductRepository.Restore(product);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }

        [HttpPost("restock")]
        public async Task<IActionResult> RestockProduct([FromBody] RestockProductDTO restockProductDTO)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(restockProductDTO.ProductId);
            if (product == null)
            {
                throw new DataNotFoundException("Product is not found");
            }

            product.StockQuantity = restockProductDTO.StockQuantity;

            _unitOfWork.ProductRepository.Update(product);
            await _unitOfWork.SaveChangeAsync();

            return RedirectToAction("GetAll");
        }
    }
}
