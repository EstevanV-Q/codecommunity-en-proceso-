using WebApplication1.Models;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Interfaces
{
    public interface IAnnouncementService
    {
        Task<IEnumerable<Announcement>> GetAllAsync();
        Task<Announcement?> GetByIdAsync(int id);
        Task<Announcement> CreateAsync(AnnouncementDto dto);
        Task<Announcement?> UpdateAsync(int id, AnnouncementDto dto);
        Task DeleteAsync(int id);
        Task<IEnumerable<Announcement>> GetByTypeAsync(string type);
        Task<IEnumerable<Announcement>> GetByAudienceAsync(string audience);
        Task<IEnumerable<Announcement>> GetActiveAsync();
        Task<IEnumerable<Announcement>> GetPinnedAsync();
    }
}
