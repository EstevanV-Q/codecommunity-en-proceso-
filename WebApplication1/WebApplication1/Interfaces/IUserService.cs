using WebApplication1.Models;
using System.Threading.Tasks;

namespace WebApplication1.Interfaces
{
    public interface IUserService
    {
        Task<UserProfile?> GetUserProfileAsync(int userId);
        Task<UserProfile> UpdateUserProfileAsync(int userId, UpdateUserProfileDto profileDto);
    }
} 