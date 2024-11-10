using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace WebAPI.Models
{
    [PrimaryKey(nameof(UserId), nameof(VoucherId))]
    public class UserVoucher
    {
        [Required(ErrorMessage = "User is required")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required(ErrorMessage = "Voucher is required")]
        public int VoucherId { get; set; }
        public Voucher? Voucher { get; set; }

        public bool IsUsed { get; set; } = false;
    }
}
