﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Contact : BaseEntity
    {
        [Required(ErrorMessage = "FullName is required")]
        [MaxLength(255, ErrorMessage = "FullName can't exceed 255 characters")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(255, ErrorMessage = "Title can't exceed 255 characters")]
        public string? Title { get; set; }

        [Required(ErrorMessage = "Message is required")]
        [MaxLength(1000, ErrorMessage = "Message can't exceed 1000 characters")]
        public string? Message { get; set; }

        public bool IsIgnored { get; set; } = false;

        [MaxLength(1000, ErrorMessage = "Message can't exceed 1000 characters")]
        public string? Respond { get; set; } = null;

        public DateTime CreationDate { get; set; }

        public User? User { get; set; }

    }
}
