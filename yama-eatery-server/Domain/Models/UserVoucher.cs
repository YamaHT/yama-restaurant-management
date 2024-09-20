using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class UserVoucher : BaseEntity
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
