namespace WebAPI.DTOs.Voucher
{
    public class UpdateVoucherDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime ExpiredDate { get; set; }  // Hoặc DateOnly nếu bạn sử dụng kiểu này
        public int ReducedPercent { get; set; }
        public int MaxReducing { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
    }
}
