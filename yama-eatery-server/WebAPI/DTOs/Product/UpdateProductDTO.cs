namespace WebAPI.DTOs.Product
{
    public class UpdateProductDTO
    {
        public int ProductId { get; set; }
        public List<string> RemainImages { get; set; } = [];
        public List<string> DeletedImages { get; set; } = [];
        public List<IFormFile> ImageFiles { get; set; } = [];
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public int SubCategoryId { get; set; }
    }
}
