using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Interfaces;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Services
{

    public class ResourceService : IResourceService
    {
        private readonly ApplicationDbContext _context;

        public ResourceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Resource>> GetAllResourcesAsync()
        {
            return await _context.Resources.ToListAsync();
        }

        public async Task<Resource?> GetResourceByIdAsync(int id)
        {
            return await _context.Resources.FindAsync(id);
        }

        public async Task<Resource> CreateResourceAsync(ResourceDto resourceDto)
        {
            var resource = new Resource
            {
                Title = resourceDto.Title,
                Description = resourceDto.Description,
                Type = resourceDto.Type,
                Url = resourceDto.Url,
                Icon = resourceDto.Icon,
                Category = resourceDto.Category,
                IsPublished = resourceDto.IsPublished,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Resources.Add(resource);
            await _context.SaveChangesAsync();

            return resource;
        }

        public async Task<Resource?> UpdateResourceAsync(int id, ResourceDto resourceDto)
        {
            var resource = await _context.Resources.FindAsync(id);
            if (resource == null)
            {
                return null;
            }

            resource.Title = resourceDto.Title;
            resource.Description = resourceDto.Description;
            resource.Type = resourceDto.Type;
            resource.Url = resourceDto.Url;
            resource.Icon = resourceDto.Icon;
            resource.Category = resourceDto.Category;
            resource.IsPublished = resourceDto.IsPublished;
            resource.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return resource;
        }

        public async Task DeleteResourceAsync(int id)
        {
            var resource = await _context.Resources.FindAsync(id);
            if (resource != null)
            {
                _context.Resources.Remove(resource);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Resource>> GetResourcesByCategoryAsync(string category)
        {
            return await _context.Resources
                .Where(r => r.Category == category && r.IsPublished)
                .ToListAsync();
        }

        public async Task<IEnumerable<Resource>> GetPublishedResourcesAsync()
        {
            return await _context.Resources
                .Where(r => r.IsPublished)
                .ToListAsync();
        }
    }
} 