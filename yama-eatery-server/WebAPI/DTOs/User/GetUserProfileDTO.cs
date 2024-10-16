using WebAPI.Models;

namespace WebAPI.DTOs.User
{
    public class GetUserProfileDTO
    {
        public string? Name { get; set; }
        public string? Image { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? Phone { get; set; }
        public string? Gender { get; set; }
        public Membership? Membership { get; set; }
    }
}
