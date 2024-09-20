using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Order : BaseEntity
    {
        public int Quantity { get; set; } = 0;

        [Column(TypeName = "numeric(10, 2)")]
        public double Total { get; set; } = 0;

        [Column(TypeName = "numeric(10, 2)")]
        public double? ActualPayment { get; set; }

        public DateTime? OrderDate { get; set; }

        [Required(ErrorMessage = "User is required")]
        public User? User { get; set; }

        public Status? Status { get; set; }

        public UserVoucher? UserVoucher { get; set; }

        public Shipping? Shipping { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = [];
    }
}
