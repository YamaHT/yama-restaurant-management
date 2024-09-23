using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Delivery : BaseEntity
    {
        [MaxLength(255)]
        public required string Name { get; set; }

        [Column(TypeName = "numeric(10, 2)")]
        public double Price { get; set; }
    }
}
