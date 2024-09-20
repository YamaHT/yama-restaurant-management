using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum CategoryEnum
    {
        [Display(Name = "Food")]
        Food = 1,

        [Display(Name = "Drink")]
        Drink = 2,

        [Display(Name = "Dessert")]
        Dessert = 3,

        [Display(Name = "Snack")]
        Snack = 4
    }
}
