namespace WebAPI.DTOs.Feedback
{
    public class ModifyProductFeedbackDTO
    {
        public int userId { get; set; }
        public int productId { get; set; }
        public string? Message { get; set; }
        public double Rating { get; set; }
    }
}
