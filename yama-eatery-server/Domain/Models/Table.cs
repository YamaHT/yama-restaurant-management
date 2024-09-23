using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Table : TrackableEntity
    {
        [Required(ErrorMessage = "Image name is required"),
            MaxLength(255, ErrorMessage = "Image name can't exceed 255 characters")]
        public required string Image { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Floor can't be negative")]
        public int Floor { get; set; }

        [Required(ErrorMessage = "TableType is required")]
        public TableType? TableType { get; set; }
    }
}
