using WebApplication1.Models;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Interfaces
{
    public interface IResourceService
    {
        Task<IEnumerable<Resource>> GetAllResourcesAsync();
        Task<Resource?> GetResourceByIdAsync(int id);
        Task<Resource> CreateResourceAsync(ResourceDto resourceDto);
        Task<Resource?> UpdateResourceAsync(int id, ResourceDto resourceDto);
        Task DeleteResourceAsync(int id);
        Task<IEnumerable<Resource>> GetResourcesByCategoryAsync(string category);
        Task<IEnumerable<Resource>> GetPublishedResourcesAsync();
    }

}
