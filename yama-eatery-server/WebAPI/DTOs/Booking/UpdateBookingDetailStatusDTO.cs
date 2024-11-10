namespace WebAPI.DTOs.Booking
{
    public class UpdateBookingDetailStatusDTO
    {
        public int BookingDetailId { get; set; }
        public string? CookingStatus { get; set; }
    }
}
