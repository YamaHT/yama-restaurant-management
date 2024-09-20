using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Profile : BaseEntity
    {
        public string? Image { get; set; }

        public DateOnly? Birthday { get; set; } = new DateOnly(1900, 01, 01);

        [MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public string? Name { get; set; }

        [Phone(ErrorMessage = "Phone must only contain numbers"),
         StringLength(10, ErrorMessage = "Phone must be exactly at 10 characters")]
        public char[]? Phone { get; set; }

        [MaxLength(255, ErrorMessage = "Address can't exceed 255 characters")]
        public string? Address { get; set; }
    }
}
