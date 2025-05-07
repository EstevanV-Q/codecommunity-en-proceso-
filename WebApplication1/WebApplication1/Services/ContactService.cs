using System.Net.Mail;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using WebApplication1.Interfaces;

namespace WebApplication1.Services
{
    public class ContactService : IContactService
    {
        private readonly IConfiguration _configuration;
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _fromEmail;
        private readonly string _fromName;

        public ContactService(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpServer = configuration["EmailSettings:SmtpServer"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpServer configuration is missing");
            _smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpPort configuration is missing"));
            _smtpUsername = configuration["EmailSettings:SmtpUsername"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpUsername configuration is missing");
            _smtpPassword = configuration["EmailSettings:SmtpPassword"] ?? throw new ArgumentNullException(nameof(configuration), "SmtpPassword configuration is missing");
            _fromEmail = configuration["EmailSettings:FromEmail"] ?? throw new ArgumentNullException(nameof(configuration), "FromEmail configuration is missing");
            _fromName = configuration["EmailSettings:FromName"] ?? throw new ArgumentNullException(nameof(configuration), "FromName configuration is missing");
        }

        // **Nuevo método para enviar correos del formulario de contacto**
        public async Task SendContactEmailAsync(string name, string email, string subject, string messageContent)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(name, email));
            message.To.Add(new MailboxAddress(_fromName, _fromEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $"<p><strong>De:</strong> {name} ({email})</p><p><strong>Mensaje:</strong><br>{messageContent}</p>"
            };
            message.Body = bodyBuilder.ToMessageBody();

            try
            {
                await SendEmailAsync(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al enviar el correo original: {ex.Message}");
                throw; // Vuelve a lanzar la excepción si es necesario
            }

            // Enviar correo de confirmación al cliente
            var confirmationMessage = new MimeMessage();
            confirmationMessage.From.Add(new MailboxAddress(_fromName, _fromEmail));
            confirmationMessage.To.Add(new MailboxAddress(name, email));
            confirmationMessage.Subject = "Confirmación de recepción de su mensaje";

            var confirmationBodyBuilder = new BodyBuilder
            {
                HtmlBody = $"<p>Hola {name},</p><p>Hemos recibido su mensaje y será atendido en breve.</p>"
            };
            confirmationMessage.Body = confirmationBodyBuilder.ToMessageBody();

            try
            {
                await SendEmailAsync(confirmationMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al enviar el correo de confirmación: {ex.Message}");
                // Aquí puedes decidir si lanzar la excepción o manejarlo de otra manera
            }
        }

        // Método reutilizable para enviar correos
        private async Task SendEmailAsync(MimeMessage message)
        {
            using var client = new MailKit.Net.Smtp.SmtpClient(); // Especificar el espacio de nombres completo
            try
            {
                await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
                await client.SendAsync(message);
            }
            finally
            {
                await client.DisconnectAsync(true);
            }
        }


    }
}
