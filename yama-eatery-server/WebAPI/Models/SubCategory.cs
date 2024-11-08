using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class SubCategory : BaseEntity
    {
        [MaxLength(255)]
        public string? Name { get; set; }

        public Category? Category { get; set; }

        public virtual ICollection<Product> Products { get; set; } = [];
    }
}
