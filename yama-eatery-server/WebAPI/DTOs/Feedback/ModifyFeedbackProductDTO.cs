namespace WebAPI.DTOs.Feedback
{
    public class ModifyFeedbackProductDTO
    {
        public int productId { get; set; }
        public string? Message { get; set; }
        public double Rating { get; set; }
    }
}
