using System.ComponentModel.DataAnnotations;
using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class BookingDetail : BaseEntity
    {
        [Required(ErrorMessage = "Booking is required")]
        public Guid BookingId { get; set; }
        public Booking? Booking { get; set; }

        [Required(ErrorMessage = "Product is required")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        [Required(ErrorMessage = "Cooking Status is required")]
        [EnumDataType(typeof(BookingStatusEnum), ErrorMessage = "This status of cooking is not available")]
        [MaxLength(20)]
        public string? CookingStatus { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Quantity can't be negative")]
        public int Quantity { get; set; }
    }
}
