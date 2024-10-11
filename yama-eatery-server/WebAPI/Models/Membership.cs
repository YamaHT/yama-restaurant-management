using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class Membership : BaseEntity
    {
        [MaxLength(20)]
        [EnumDataType(typeof(MembershipStatusEnum), ErrorMessage = "This status of membership is not available")]
        public required string MembershipStatus { get; set; }

        [MaxLength(20)]
        [EnumDataType(typeof(RankEnum), ErrorMessage = "This rank is not available")]
        public string? Rank { get; set; } = null;

        public int MemberScore { get; set; }
    }
}
