using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }

    public abstract class TrackableEntity : BaseEntity
    {
        public DateTime CreationDate { get; set; }

        public DateTime? ModificationDate { get; set; }

        public DateTime? DeletionDate { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
