namespace WebApplication1.Interfaces
{
    public interface IContactService
    {
        Task SendContactEmailAsync(string name, string email, string subject, string messageContent); // Nuevo método
    }
}
