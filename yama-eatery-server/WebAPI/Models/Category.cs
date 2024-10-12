using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Category : BaseEntity
    {
        [MaxLength(255)]
        public required string Name { get; set; }

        public virtual ICollection<SubCategory> SubCategories { get; set; } = [];
    }
}
