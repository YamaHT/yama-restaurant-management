namespace WebAPI.DTOs.Staff
{
    public class AddStaffInformationDTO
    {
        public IFormFile? ImageFile { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? Phone { get; set; }
        public string? Gender { get; set; }
    }
}
