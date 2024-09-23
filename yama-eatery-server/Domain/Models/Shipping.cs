using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Domain.Models
{
    public class Shipping : BaseEntity
    {
        [Required(ErrorMessage = "RecipientName is required"),
            MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public required string RecipientName { get; set; }

        [Required(ErrorMessage = "Phone is required"),
            Phone(ErrorMessage = "Phone must only contain numbers"),
            StringLength(10, ErrorMessage = "Phone must be exactly at 10 characters")]
        public required char[] Phone { get; set; }

        [Required(ErrorMessage = "Address is required"),
            MaxLength(255, ErrorMessage = "Address can't exceed 255 characters")]
        public required string Address { get; set; }

        [Required(ErrorMessage = "Delivery is required")]
        public Delivery? Delivery { get; set; }
    }
}
