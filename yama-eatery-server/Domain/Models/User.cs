using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Domain.Models
{
    public class User : TrackableEntity
    {
        [Required(ErrorMessage = "Email is required"),
            MaxLength(50, ErrorMessage = "Email can't exceed 50 characters"),
            EmailAddress(ErrorMessage = "Email must be in correct format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required"),
            MaxLength(16, ErrorMessage = "Password can't exceed 16 characters")]
        public required string Password { get; set; }

        public Role? Role { get; set; }

        public Profile? Profile { get; set; }

        public virtual ICollection<FeedbackProduct> Feedbacks { get; set; } = [];
        
        public virtual ICollection<UserVoucher> UserVouchers { get; set; } = [];

        public virtual ICollection<Order> Orders { get; set; } = [];

        public virtual ICollection<Booking> BookingsUser { get; set; } = [];

        public virtual ICollection<Booking> BookingsWaiter { get; set; } = [];
    }
}
