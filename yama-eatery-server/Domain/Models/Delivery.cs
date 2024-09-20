using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Delivery : BaseEntity
    {
        [Required, MaxLength(255)]
        public required string Name { get; set; }

        [Column(TypeName = "numeric(10, 2)")]
        public double Price { get; set; }
    }
}
