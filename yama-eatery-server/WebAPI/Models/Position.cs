using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
	public class Position : BaseEntity
	{
        [MaxLength(255)]
        public required string Name { get; set; }

        [Column(TypeName = "numeric(10, 2)")]
        public double BaseSalary { get; set; }

        public virtual ICollection<Employee> Employees { get; set; } = [];
    }
}
