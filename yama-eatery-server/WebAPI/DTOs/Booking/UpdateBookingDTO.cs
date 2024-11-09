namespace WebAPI.DTOs.Booking
{
    public class UpdateBookingDTO
    {
        public Guid Id { get; set; }
        public string? CustomerName { get; set; }
        public string? Phone { get; set; }
        public string? Note { get; set; }
    }
}
