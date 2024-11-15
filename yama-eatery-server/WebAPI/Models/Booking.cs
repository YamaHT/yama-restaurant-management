﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models.Enums;

namespace WebAPI.Models
{
    public class Booking
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(255, ErrorMessage = "Customer Name can't exceed 255 characters")]
        public string? CustomerName { get; set; }

        [Phone(ErrorMessage = "Phone must only contain numbers")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone must be exactly at 10 characters")]
        [Column(TypeName = "char(10)")]
        public string? Phone { get; set; }

        [MaxLength(1000, ErrorMessage = "Note can't exceed 1000 characters")]
        public string? Note { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Total Payment can't be negative")]
        public double TotalPayment { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Deposit Price can't be negative")]
        public double DepositPrice { get; set; }

        [Range(0, Double.PositiveInfinity, ErrorMessage = "Remain Payment can't be negative")]
        public double RemainPayment { get; set; }

        [Required(ErrorMessage = "BookingDate is required")]
        public DateOnly BookingDate { get; set; }

        [Required(ErrorMessage = "DayPart is required")]
        [Column(TypeName = "nvarchar(10)")]
        [EnumDataType(typeof(DayPartEnum), ErrorMessage = "This day part is not available")]
        public string? DayPart { get; set; }

        [Required(ErrorMessage = "Booking Status is required")]
        [EnumDataType(typeof(BookingStatusEnum), ErrorMessage = "This status of booking is not available")]
        [MaxLength(20)]
        public string? BookingStatus { get; set; }
        
        public DateTime NewPaymentDate { get; set; }

        public User? User { get; set; }

        public Table? Table { get; set; }

        public Employee? Employee { get; set; }

        public Voucher? Voucher { get; set; }

        public virtual ICollection<BookingDetail> BookingDetails { get; set; } = [];
    }
}
