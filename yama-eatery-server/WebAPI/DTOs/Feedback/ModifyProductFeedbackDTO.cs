namespace WebAPI.DTOs.Feedback
{
    public class ModifyProductFeedbackDTO
    {
        public int ProductId { get; set; }
        public string? Message { get; set; }
        public double Rating { get; set; }
    }
}
