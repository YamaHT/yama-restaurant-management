using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Voucher : TrackableEntity
    {
        [Required(ErrorMessage = "Image is required")]
        [MaxLength(255, ErrorMessage = "Image can't exceed 255 characters")]
        public string? Image { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(1000, ErrorMessage = "Description can't exceed 1000 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "ExpiredDate is required")]
        public DateOnly ExpiredDate { get; set; }

        [Range(0, 75, ErrorMessage = "ReducedPercent must between 0 and 75")]
        public int ReducedPercent { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "MaxReducing can't be negative")]
        public double MaxReducing { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Quantity can't be negative")]
        public int Quantity { get; set; }

        public virtual ICollection<UserVoucher> UserVouchers { get; set; } = [];
    }
}
