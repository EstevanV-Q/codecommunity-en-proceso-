using WebApplication1.Data;
using WebApplication1.Models.DTOs;
using WebApplication1.Models;
using WebApplication1.Interfaces;
using Microsoft.EntityFrameworkCore;

    namespace WebApplication1.Services
    {
        public class Announcementervice : IAnnouncementService
        {
            private readonly ApplicationDbContext _context;

            public Announcementervice(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Announcement>> GetAllAsync()
            {
                return await _context.Announcement.ToListAsync();
            }

            public async Task<Announcement?> GetByIdAsync(int id)
            {
                return await _context.Announcement.FindAsync(id);
            }

            public async Task<Announcement> CreateAsync(AnnouncementDto dto)
            {
                var announcement = new Announcement
                {
                    Title = dto.Title,
                    Content = dto.Content,
                    Type = dto.Type,
                    TargetAudience = dto.TargetAudience,
                    IsActive = dto.IsActive,
                    IsPinned = dto.IsPinned,
                    CreatedBy = dto.CreatedBy,
                    PublishDate = dto.PublishDate,
                    ExpireDate = dto.ExpireDate,
                    CreateAT = DateTime.UtcNow,
                    UpdateAT = DateTime.UtcNow
                };

                _context.Announcement.Add(announcement);
                await _context.SaveChangesAsync();
                return announcement;
            }

        public async Task<Announcement?> UpdateAsync(int id, AnnouncementDto dto)
        {
            var announcement = await _context.Announcement.FindAsync(id);
            if (announcement == null) return null;

            announcement.Title = dto.Title;
            announcement.Content = dto.Content;
            announcement.Type = dto.Type;
            announcement.TargetAudience = dto.TargetAudience;
            announcement.IsActive = dto.IsActive;
            announcement.IsPinned = dto.IsPinned;
            announcement.CreatedBy = dto.CreatedBy;
            announcement.PublishDate = dto.PublishDate;
            announcement.ExpireDate = dto.ExpireDate;
            announcement.UpdateAT = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task DeleteAsync(int id)
            {
                var announcement = await _context.Announcement.FindAsync(id);
                if (announcement != null)
                {
                    _context.Announcement.Remove(announcement);
                    await _context.SaveChangesAsync();
                }
            }

            public async Task<IEnumerable<Announcement>> GetByTypeAsync(string type)
            {
                return await _context.Announcement.Where(a => a.Type == type).ToListAsync();
            }

            public async Task<IEnumerable<Announcement>> GetByAudienceAsync(string audience)
            {
                return await _context.Announcement.Where(a => a.TargetAudience == audience).ToListAsync();
            }

            public async Task<IEnumerable<Announcement>> GetActiveAsync()
            {
                return await _context.Announcement.Where(a => a.IsActive).ToListAsync();
            }

            public async Task<IEnumerable<Announcement>> GetPinnedAsync()
            {
                return await _context.Announcement.Where(a => a.IsPinned).ToListAsync();
            }
        }
    }
