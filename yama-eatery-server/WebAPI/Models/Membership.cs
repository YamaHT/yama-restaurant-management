using System.ComponentModel.DataAnnotations;
using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class Membership : BaseEntity
    {
        [Required(ErrorMessage = "Status is required")]
        [MaxLength(20)]
        [EnumDataType(typeof(MembershipStatusEnum), ErrorMessage = "This status of membership is not available")]
        public string? MembershipStatus { get; set; }

        [Required(ErrorMessage = "Rank is required")]
        [MaxLength(20)]
        [EnumDataType(typeof(RankEnum), ErrorMessage = "This rank is not available")]
        public string? Rank { get; set; }

        public int MemberScore { get; set; } = 0;
    }
}
