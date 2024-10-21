namespace WebAPI.DTOs.Voucher
{
    public class UpdateVoucherDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime ExpiredDate { get; set; }
        public int ReducedPercent { get; set; }
        public int MaxReducing { get; set; }
        public int Quantity { get; set; }
        public IFormFile? Image { get; set; }
    }
}
