using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;
using System.Net;

namespace WebAPI.Utils.EmailSender
{
    public static class SendMailUtil
    {
        public static async Task SendMailOtpAsync(IConfiguration configuration, string email, string otp)
        {
            IEmailSender emailSender = new EmailSender(configuration);
            await emailSender.SendEmailAsync(email, $"YRMS, Your OTP is {otp}",
                $"Here is your otp (one time password): {otp}");
        }
        public static async Task SendMailPasswordAsync(IConfiguration configuration, string email, string password)
        {
            IEmailSender emailSender = new EmailSender(configuration);
            await emailSender.SendEmailAsync(email, $"YRMS, New Password Arrived",
                $"Here is your password: {password}");
        }

    }
}
