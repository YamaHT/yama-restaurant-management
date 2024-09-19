using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Voucher : TrackableEntity
    {
        [MaxLength(255, ErrorMessage = "Image name can't exceed length 255")]
        public string Image { get; set; }

        [MaxLength(255, ErrorMessage = "Name can't exceed length 255")]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateOnly ExpiredDate { get; set; }

        public int ReducedPercent { get; set; }

        public double MaxReducing { get; set; }

        public int Quantity { get; set; }
    }
}
