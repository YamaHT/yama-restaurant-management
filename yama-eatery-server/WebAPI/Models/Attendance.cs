using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Attendance : BaseEntity
    {
        public DateOnly Date { get; set; }

        public TimeOnly CheckInTime { get; set; }

        public TimeOnly CheckOutTime { get; set; }

        [Column(TypeName = "numeric(3, 1)")]
        [Range(0, Double.PositiveInfinity, ErrorMessage = "WorkHours can't be negative")]
        public double WorkHours { get; set; }

        public bool LateArrival { get; set; } = false;

        public bool EarlyLeave { get; set; } = false;

        public Employee? Employee { get; set; }
    }
}
