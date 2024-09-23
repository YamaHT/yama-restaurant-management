using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Status : BaseEntity
    {
        [MaxLength(255)]
        public required string Name { get; set; }
    }
}
