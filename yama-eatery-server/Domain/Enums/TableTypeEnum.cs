using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum TableTypeEnum
    {
        [Display(Name = "Small")]
        Small = 1,

        [Display(Name = "Big")]
        Big = 2,

        [Display(Name = "Round")]
        Round = 3,

        [Display(Name = "Private")]
        Private = 4
    }
}
