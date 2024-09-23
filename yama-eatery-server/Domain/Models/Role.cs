using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
	public class Role : BaseEntity
	{
        [MaxLength(255)]
        public required string Name { get; set; }
    }
}
