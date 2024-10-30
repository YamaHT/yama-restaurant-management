namespace WebAPI.DTOs.Booking
{
    public class UpdateBookingDetailDTO
    {
        public Guid BookingId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
