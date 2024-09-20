using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Table : TrackableEntity
    {
        [Required(ErrorMessage = "Image name is required"),
            MaxLength(255, ErrorMessage = "Image name can't exceed 255 characters")]
        public required string Image { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Floor can't be negative")]
        public int Floor { get; set; }

        [Required(ErrorMessage = "Type is required")]
        public TableType? Type { get; set; }
    }
}
