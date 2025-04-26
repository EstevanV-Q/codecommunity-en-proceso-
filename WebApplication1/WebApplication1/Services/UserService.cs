using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using System.Threading.Tasks;
using System;

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
    }
} 