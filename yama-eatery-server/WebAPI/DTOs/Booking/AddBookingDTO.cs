﻿namespace WebAPI.DTOs.Booking
{
    public class AddBookingDTO
    {
        public int TableId { get; set; }
        public DateOnly Date { get; set; }
        public string? DayPart { get; set; }
    }
}
