using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Profile : BaseEntity
    {
        public string? Image { get; set; }
        public DateOnly? Birthday { get; set; }

        [MaxLength(255, ErrorMessage = "Name can't exceed length 255")]
        public string? Name { get; set; }

        [Phone(ErrorMessage = "Phone must only contain numbers"),
         StringLength(10, ErrorMessage = "Phone must be exactly at length 10")]
        public char[]? Phone { get; set; }

        [MaxLength(255, ErrorMessage = "Address can't exceed length 255")]
        public string? Address { get; set; }
    }
}
