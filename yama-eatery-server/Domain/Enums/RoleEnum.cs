using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
	public enum RoleEnum
	{
        [Display(Name = "Customer")]
        Customer = 1,

        [Display(Name = "Staff")]
        Staff = 2,

        [Display(Name = "Manager")]
        Manager = 3
    }
}
