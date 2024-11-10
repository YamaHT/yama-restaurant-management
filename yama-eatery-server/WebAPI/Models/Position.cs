using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
	public class Position : BaseEntity
	{
        [MaxLength(255)]
        public string? Name { get; set; }

        public double HourlyWage { get; set; }

        public virtual ICollection<Employee> Employees { get; set; } = [];
    }
}
