namespace WebAPI.DTOs.Product
{
    public class AddProductDTO
    {
        public List<IFormFile> ImageFiles { get; set; } = [];
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public int StockQuantity { get; set; } 
        public int SubCategoryId { get; set; }
    }
}
