using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Salary : BaseEntity
    {
        [Column(TypeName = "numeric(10, 2)")]
        [Range(0, Double.PositiveInfinity, ErrorMessage = "Bonus can't be negative")]
        public double Bonus { get; set; }

        [Column(TypeName = "numeric(10, 2)")]
        [Range(0, Double.PositiveInfinity, ErrorMessage = "Deductions can't be negative")]
        public double Deductions { get; set; }

        [Column(TypeName = "numeric(10, 2)")]
        [Range(0, Double.PositiveInfinity, ErrorMessage = "NetSalary can't be negative")]
        public double NetSalary { get; set; }

        public DateOnly SalaryDate { get; set; }

        [Required(ErrorMessage = "Employee is required")]
        public Employee? Employee { get; set; }
    }
}
