using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Enums
{
    public enum PositionEnum
    {
        [Display(Name = "1")]
        Staff = 300,
        [Display(Name = "2")]
        Manager = 800
    }
}
