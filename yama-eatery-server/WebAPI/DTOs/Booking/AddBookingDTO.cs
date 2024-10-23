namespace WebAPI.DTOs.Booking
{
    public class ProductWithQuantity
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class AddBookingDTO
    {
        public List<ProductWithQuantity> Products { get; set; } = [];
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public DateOnly BookingDate { get; set; }
        public string? DayPart { get; set; }
        public string? Note { get; set; }
        public double TotalPayment { get; set; }
        public double DepositPrice { get; set; }
        public int TableId { get; set; }
        public int UserVoucherId { get; set; }
    }
}
