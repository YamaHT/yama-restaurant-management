using System.ComponentModel.DataAnnotations;
using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class Membership : BaseEntity
    {
        public bool IsRequested { get; set; } = false;
        
        public bool IsActive { get; set; } = false;

        [EnumDataType(typeof(RoleEnum))]
        public string Rank { get; set; }
    }
}
