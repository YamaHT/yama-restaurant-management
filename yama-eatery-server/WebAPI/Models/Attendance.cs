using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Attendance : BaseEntity
    {
        public DateOnly Date { get; set; }

        public TimeOnly CheckInTime { get; set; }

        public TimeOnly CheckOutTime { get; set; }

        [Column(TypeName = "numeric(2, 1)")]
        [Range(0, Double.PositiveInfinity, ErrorMessage = "WorkHours can't be negative")]
        public double WorkHours { get; set; }

        public bool LateArrival { get; set; } = false;

        public bool EarlyLeave { get; set; } = false;

        [Required(ErrorMessage = "Employee is required")]
        public Employee? Employee { get; set; }
    }
}
