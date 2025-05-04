namespace WebApplication1.Services
{
    public interface IValidationService
    {
        bool ValidateEmail(string email);
        bool ValidatePassword(string password);
        bool ValidateUsername(string username);
    }
} 