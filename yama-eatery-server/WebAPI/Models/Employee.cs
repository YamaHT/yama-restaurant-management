using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Employee : TrackableEntity
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(50, ErrorMessage = "Email can't exceed 50 characters")]
        [EmailAddress(ErrorMessage = "Email must be in correct format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MaxLength(255)]
        [JsonIgnore]
        public string? Password { get; set; }

        [MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public string? Name { get; set; }

        [MaxLength(255, ErrorMessage = "Image can't exceed 255 characters")]
        public string? Image { get; set; }

        public DateOnly? Birthday { get; set; } = new DateOnly(1900, 01, 01);

        [Phone(ErrorMessage = "Phone must only contain numbers")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone must be exactly at 10 characters")]
        [Column(TypeName = "char(10)")]
        public string? Phone { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        [Required(ErrorMessage = "Position is required")]
        public Position? Position { get; set; }

        public virtual ICollection<Salary> Salaries { get; set; } = [];

        public virtual ICollection<Attendance> Attendances { get; set; } = [];

    }
}
