namespace WebAPI.DTOs.Staff
{
    public class AddStaffDTO
    {
        public List<IFormFile>? ImageFiles { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime Birthday { get; set; }
        public int Phone { get; set; }
        public string? Gender { get; set; }
        public int PositionId { get; set; }


    }
}
