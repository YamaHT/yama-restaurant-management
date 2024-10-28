using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;
using System.Net;
using WebAPI.Models;

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

        public static async Task SendMailContactAsync(IConfiguration configuration, Contact contact, string respond)
        {
            IEmailSender emailSender = new EmailSender(configuration);
            await emailSender.SendEmailAsync(contact.User.Email, "YRMS, Support your contact", $"Hello, I want to respond to your contact\n" +
                $"\"{contact.Title}\n{contact.Message}\"" +
                $"{respond}");
        }
    }
}
