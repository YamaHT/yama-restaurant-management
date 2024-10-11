using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Product : TrackableEntity
    {
        [Required(ErrorMessage = "Image is required")]
        public required List<string> Image { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public required string Name { get; set; }

        [Column(TypeName = "numeric(10, 2)")]
        [Range(0, Double.PositiveInfinity, ErrorMessage = "Price can't be negative")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(1000, ErrorMessage = "Description can't exceed 1000 characters")]
        public required string Description { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "StockQuantity can't be negative")]
        public int StockQuantity { get; set; }

        [Required(ErrorMessage = "SubCategory is required")]
        public SubCategory? SubCategory { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<FeedbackProduct>? Feedbacks { get; set; } = null;
    }
}