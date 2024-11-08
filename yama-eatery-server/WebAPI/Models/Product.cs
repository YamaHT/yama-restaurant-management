using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Product : TrackableEntity
    {
        [Required(ErrorMessage = "Image is required")]
        public List<string>? Image { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public string? Name { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Price can't be negative")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(1000, ErrorMessage = "Description can't exceed 1000 characters")]
        public string? Description { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "StockQuantity can't be negative")]
        public int StockQuantity { get; set; }

        public SubCategory? SubCategory { get; set; }

        public virtual ICollection<FeedbackProduct> Feedbacks { get; set; } = [];

        public virtual ICollection<BookingDetail> BookingDetails { get; set; } = [];
    }
}