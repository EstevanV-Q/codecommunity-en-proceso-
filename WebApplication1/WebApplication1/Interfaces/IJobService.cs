using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IJobService
    {
        Task<IEnumerable<JobPosting>> GetAllJobsAsync();
        Task<JobPosting> GetJobByIdAsync(string id);
        Task<JobPosting> CreateJobAsync(JobPosting job);
        Task<JobPosting> UpdateJobAsync(string id, JobPosting job);
        Task<bool> DeleteJobAsync(string id);
        Task<IEnumerable<JobPosting>> SearchJobsAsync(string searchTerm);
    }
} 