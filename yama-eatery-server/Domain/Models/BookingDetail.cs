using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
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
