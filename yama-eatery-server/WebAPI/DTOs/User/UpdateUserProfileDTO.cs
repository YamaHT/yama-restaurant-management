namespace WebAPI.DTOs.User
{
    public class UpdateUserProfileDTO
    {
        public string? Name { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? Phone { get; set; }
        public string? Gender { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
