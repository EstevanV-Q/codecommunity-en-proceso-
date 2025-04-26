using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using WebApplication1.Interfaces;

namespace WebApplication1.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _fromEmail;
        private readonly string _fromName;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpServer = configuration["EmailSettings:SmtpServer"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpServer configuration is missing");
            _smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpPort configuration is missing"));
            _smtpUsername = configuration["EmailSettings:SmtpUsername"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpUsername configuration is missing");
            _smtpPassword = configuration["EmailSettings:SmtpPassword"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpPassword configuration is missing");
            _fromEmail = configuration["EmailSettings:FromEmail"] ?? throw new ArgumentNullException(nameof(configuration), "FromEmail configuration is missing");
            _fromName = configuration["EmailSettings:FromName"] ?? throw new ArgumentNullException(nameof(configuration), "FromName configuration is missing");
        }

        public async Task SendEmailConfirmationAsync(string email, string token)
        {
            var baseUrl = _configuration["App:BaseUrl"] ?? "https://codecommunity.com";
            var confirmationLink = $"{baseUrl}/confirm-email?token={token}";
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_fromName, _fromEmail));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Confirm your email";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $"<p>Please confirm your email by clicking this link: <a href='{confirmationLink}'>{confirmationLink}</a></p>"
            };
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public async Task SendPasswordResetAsync(string email, string token)
        {
            var baseUrl = _configuration["App:BaseUrl"] ?? "https://codecommunity.com";
            var resetLink = $"{baseUrl}/reset-password?token={token}";
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_fromName, _fromEmail));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Reset your password";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $"<p>Click this link to reset your password: <a href='{resetLink}'>{resetLink}</a></p>"
            };
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
} 