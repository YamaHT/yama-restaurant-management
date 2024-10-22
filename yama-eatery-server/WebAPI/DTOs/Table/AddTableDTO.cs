namespace WebAPI.DTOs.Table
{
    public class AddTableDTO
    {
        public List<IFormFile> ImageFiles { get; set; } = [];
        public int Floor { get; set; }
        public string Type { get; set; }
    }
}
