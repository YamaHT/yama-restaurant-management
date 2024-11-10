using System.ComponentModel.DataAnnotations;
using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class Table : TrackableEntity
    {
        [Required(ErrorMessage = "Image is required")]
        public List<string>? Image { get; set; }
            
        [Range(0, Double.PositiveInfinity, ErrorMessage = "Floor can't be negative")]
        public int Floor { get; set; }

        [Required(ErrorMessage = "Type is required")]
        [MaxLength(20)]
        [EnumDataType(typeof(TypeEnum), ErrorMessage = "This type of table is not available")]
        public string? Type { get; set; }
    }
}
