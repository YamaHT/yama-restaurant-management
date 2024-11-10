namespace WebAPI.DTOs.User
{
    public class UserSendOtpDTO
    {
        public required string Email { get; set; }
        public required string OTP { get; set; }
    }
}
