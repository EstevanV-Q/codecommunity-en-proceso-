namespace WebApplication1.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string email, string token);
        Task SendPasswordResetAsync(string email, string token);
        Task SendContactEmailAsync(string name, string email, string subject, string messageContent); // Nuevo m�todo
    }
} 