namespace WebAPI.DTOs.Table
{
    public class UpdateTableDTO
    {
        public int TableId { get; set; }
        public List<string> RemainImages { get; set; } = [];
        public List<string> DeletedImages { get; set; } = [];
        public List<IFormFile> ImageFiles { get; set; } = [];
        public int Floor { get; set; }
        public string Type { get; set; }

    }
}
