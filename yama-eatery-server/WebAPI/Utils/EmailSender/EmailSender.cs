using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace WebAPI.Utils.EmailSender
{
    public class EmailSender(IConfiguration configuration) : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            string? sender = configuration["EmailSettings:Email"];
            string? password = configuration["EmailSettings:EmailPassword"];
            MailMessage mail = new()
            {
                From = new MailAddress(sender ?? "DuyLPCE181153@fpt.edu.vn"),
                Subject = subject,
                Body = htmlMessage,
                IsBodyHtml = true,
            };

            mail.To.Add(email);
            SmtpClient client = new()
            {
                Port = 587,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(sender, password)
            };

            return client.SendMailAsync(mail);
        }
    }
}
