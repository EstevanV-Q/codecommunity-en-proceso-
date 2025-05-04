using WebApplication1.Models;
using System.Threading.Tasks;
using WebApplication1.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Interfaces
{
    public interface IUserService
    {
        Task<UserProfile?> GetUserProfileAsync(int userId);
        Task<UserProfile> UpdateUserProfileAsync(int userId, UpdateUserProfileDto profileDto);
        Task<IEnumerable<UserAdminDto>> GetAllAdminAsync();
        Task<UserAdminDto?> GetByIdAsync(int id);
        Task<UserAdminDto?> CreateAdminAsync(UserCreateUpdateDto dto);
        Task<UserAdminDto?> UpdateAdminAsync(int id, UserCreateUpdateDto dto);
        Task<bool> DeleteAdminAsync(int id);
        Task<bool> UpdateUserStatusAsync(int id, string status);
    }
} 