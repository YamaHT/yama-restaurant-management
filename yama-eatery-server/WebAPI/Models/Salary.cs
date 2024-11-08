using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Salary : BaseEntity
    {
        [Range(0, Double.PositiveInfinity, ErrorMessage = "Deductions can't be negative")]
        public double Deductions { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "NetSalary can't be negative")]
        public double NetSalary { get; set; }

        public DateOnly? PayDay { get; set; } = null;

        public Employee? Employee { get; set; }
    }
}
