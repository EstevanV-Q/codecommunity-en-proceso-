using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using System.Threading.Tasks;
using System;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserProfile?> GetUserProfileAsync(int userId)
        {
            return await _context.UserProfiles
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<UserProfile> UpdateUserProfileAsync(int userId, UpdateUserProfileDto profileDto)
        {
            var profile = await _context.UserProfiles
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (profile == null)
            {
                profile = new UserProfile
                {
                    Id = userId,
                    CreatedAt = DateTime.UtcNow
                };
                _context.UserProfiles.Add(profile);
            }

            // Update profile properties
            profile.FirstName = profileDto.FirstName;
            profile.LastName = profileDto.LastName;
            profile.Email = profileDto.Email;
            profile.Bio = profileDto.Bio;
            profile.Location = profileDto.Location;
            profile.ProfilePictureUrl = profileDto.ProfilePictureUrl;
            profile.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return profile;
        }
        //gestion de usuarios
        public async Task<IEnumerable<UserAdminDto>> GetAllAdminAsync()
        {
            return await _context.Users
                .Select(u => new UserAdminDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    PhoneNumber = u.PhoneNumber,
                    Address = u.Address,
                    DateOfBirth = u.DateOfBirth,
                    IsActive = u.IsActive,
                    Role = u.Role,
                    Status = u.Status,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt,
                    LastLoginAt = u.LastLoginAt,
                    PreferencesJson = u.PreferencesJson,
                    ProgressJson = u.ProgressJson
                })
                .ToListAsync();
        }

        public async Task<UserAdminDto?> GetByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserAdminDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                IsActive = user.IsActive,
                Role = user.Role,
                Status = user.Status,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                LastLoginAt = user.LastLoginAt,
                PreferencesJson = user.PreferencesJson,
                ProgressJson = user.ProgressJson
            };
        }

        public async Task<UserAdminDto?> CreateAdminAsync(UserCreateUpdateDto dto)
        {
            var user = new User
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                DateOfBirth = dto.DateOfBirth,
                IsActive = dto.IsActive,
                Role = dto.Role,
                Status = dto.Status,
                PreferencesJson = dto.PreferencesJson,
                ProgressJson = dto.ProgressJson,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserAdminDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                IsActive = user.IsActive,
                Role = user.Role,
                Status = user.Status,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                LastLoginAt = user.LastLoginAt,
                PreferencesJson = user.PreferencesJson,
                ProgressJson = user.ProgressJson
            };
        }

        public async Task<UserAdminDto?> UpdateAdminAsync(int id, UserCreateUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            user.Email = dto.Email;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.PhoneNumber;
            user.Address = dto.Address;
            user.DateOfBirth = dto.DateOfBirth;
            user.IsActive = dto.IsActive;
            user.Role = dto.Role;
            user.Status = dto.Status;
            user.PreferencesJson = dto.PreferencesJson;
            user.ProgressJson = dto.ProgressJson;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new UserAdminDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                IsActive = user.IsActive,
                Role = user.Role,
                Status = user.Status,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                LastLoginAt = user.LastLoginAt,
                PreferencesJson = user.PreferencesJson,
                ProgressJson = user.ProgressJson
            };
        }

        public async Task<bool> DeleteAdminAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUserStatusAsync(int id, string status)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.Status = status;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 