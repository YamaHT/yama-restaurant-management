using System.ComponentModel.DataAnnotations;

namespace Domain.Enums
{
    public enum StatusEnum
    {
        [Display(Name = "In Cart")]
        In_Cart = 1,

        [Display(Name = "Pay Later")]
        Pay_Later = 2,

        [Display(Name = "Not Pay Yet")]
        Not_Pay_Yet = 3,

        [Display(Name = "Pay Online")]
        Pay_Online = 4,

        [Display(Name = "On Delivering")]
        On_Delivering = 5,

        [Display(Name = "Delivered")]
        Delivered = 6,

        [Display(Name = "Confirmed")]
        Confirmed = 7,

        [Display(Name = "Is Error")]
        Is_Error = 8
    }
}
