using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Booking : BaseEntity
    {
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required(ErrorMessage = "Table is required")]
        public int TableId { get; set; }
        public Table? Table { get; set; }

        public int WaiterId { get; set; }
        public User? Waiter { get; set; }

        [Required(ErrorMessage = "BookingDate is required")]
        public DateOnly BookingDate { get; set; }

        [Required(ErrorMessage = "DayPart is required")]
        [Column(TypeName = "nvarchar(10)")]
        public required string DayPart { get; set; }

        public bool IsBooking { get; set; } = true;

        public virtual ICollection<BookingDetail> BookingDetails { get; set; } = [];
    }
}
