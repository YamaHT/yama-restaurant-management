using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class User : TrackableEntity
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(50, ErrorMessage = "Email can't exceed 50 characters")]
        [EmailAddress(ErrorMessage = "Email must be in correct format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MaxLength(255)]
        [JsonIgnore]
        public string? Password { get; set; }

        public Role? Role { get; set; }

        public Profile? Profile { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<FeedbackProduct>? Feedbacks { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<UserVoucher>? UserVouchers { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<Booking>? BookingsUser { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<Booking>? BookingsWaiter { get; set; } = null;
    }
}
