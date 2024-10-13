using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [PrimaryKey(nameof(UserId), nameof(ProductId))]
    public class FeedbackProduct
    {
        [Required(ErrorMessage = "User is required")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required(ErrorMessage = "Product is required")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        [Column(TypeName = "numeric(1,1)")]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public double Rating { get; set; }

        [MaxLength(1000, ErrorMessage = "Message can't exceed 1000 characters")]
        public string? Message { get; set; }    
    }
}
