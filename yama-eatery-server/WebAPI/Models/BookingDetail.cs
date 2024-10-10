using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    [PrimaryKey(nameof(BookingId), nameof(ProductId))]
    public class BookingDetail
    {
        [Required(ErrorMessage = "Booking is required")]
        public int BookingId { get; set; }
        public Booking? Booking { get; set; }

        [Required(ErrorMessage = "Product is required")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public bool IsPaid { get; set; } = false;
    }
}
