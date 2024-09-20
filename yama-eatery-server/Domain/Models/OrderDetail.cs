using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    [PrimaryKey(nameof(OrderId), nameof(ProductId))]
    public class OrderDetail
    {
        [Required(ErrorMessage = "Order is required")]
        public int OrderId { get; set; }
        public Order? Order { get; set; }

        [Required(ErrorMessage = "Product is required")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        [Required(ErrorMessage = "SubQuantity is required")]
        public required int SubQuantity { get; set; }

        [Required(ErrorMessage = "SubTotal is required"),
            Column(TypeName = "numeric(10, 2)")]
        public required double SubTotal { get; set; }
    }
}
