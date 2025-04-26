using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<bool> ForgotPasswordAsync(string email);
        Task<bool> ResetPasswordAsync(ResetPasswordRequest request);
        Task<bool> ConfirmEmailAsync(string token);
        Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword); 
    }
} 