using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#pragma warning disable
namespace Domain.Models
{
    public class User : TrackableEntity
    {
        [Required(ErrorMessage = "Email is required"), MaxLength(50, ErrorMessage = "Email can't exceed length 50")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required"), MaxLength(16, ErrorMessage = "Password can't exceed length 16")]
        public string Password { get; set; }

        public required Role Role { get; set; }

        public Profile? Profile { get; set; }
    }   
}
