using System.Text.RegularExpressions;

namespace WebApplication1.Services
{
    public class ValidationService : IValidationService
    {
        public bool ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public bool ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                return false;

            // Mínimo 8 caracteres, al menos una letra mayúscula, una minúscula, un número y un carácter especial
            var regex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
            return regex.IsMatch(password);
        }

        public bool ValidateUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return false;

            // Solo letras, números y guiones bajos, longitud entre 3 y 20 caracteres
            var regex = new Regex(@"^[a-zA-Z0-9_]{3,20}$");
            return regex.IsMatch(username);
        }
    }
} 