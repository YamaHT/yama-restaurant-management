﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class User : TrackableEntity
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(50, ErrorMessage = "Email can't exceed 50 characters")]
        [EmailAddress(ErrorMessage = "Email must be in correct format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MaxLength(255)]
        [JsonIgnore]
        public string? Password { get; set; }

        public string? Image { get; set; }

        public DateOnly? Birthday { get; set; } = new DateOnly(1900, 01, 01);

        [MaxLength(255, ErrorMessage = "Name can't exceed 255 characters")]
        public string? Name { get; set; }

        [Phone(ErrorMessage = "Phone must only contain numbers")]
        [StringLength(10, ErrorMessage = "Phone must be exactly at 10 characters")]
        public char[]? Phone { get; set; }

        [MaxLength(255, ErrorMessage = "Address can't exceed 255 characters")]
        public string? Address { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<FeedbackProduct>? Feedbacks { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<UserVoucher>? UserVouchers { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<Booking>? Bookings { get; set; } = null;
    }
}