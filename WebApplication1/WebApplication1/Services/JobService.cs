using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class JobService : IJobService
    {
        private readonly List<JobPosting> _jobs;

        public JobService()
        {
            // Initialize with some sample data
            _jobs = new List<JobPosting>
            {
                new JobPosting
                {
                    Id = "1",
                    Title = "Senior React Developer",
                    Company = "Tech Corp",
                    Location = "Madrid, España",
                    Description = "Buscamos un desarrollador React senior...",
                    Requirements = new List<string> { "React", "TypeScript", "5+ años de experiencia" },
                    Salary = "45,000€ - 60,000€",
                    ContactEmail = "jobs@techcorp.com",
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = "Admin",
                    Type = "full-time",
                    WorkMode = "hybrid"
                }
            };
        }

        public Task<IEnumerable<JobPosting>> GetAllJobsAsync()
        {
            return Task.FromResult<IEnumerable<JobPosting>>(_jobs);
        }

        public Task<JobPosting> GetJobByIdAsync(string id)
        {
            return Task.FromResult(_jobs.FirstOrDefault(j => j.Id == id));
        }

        public Task<JobPosting> CreateJobAsync(JobPosting job)
        {
            job.Id = Guid.NewGuid().ToString();
            job.CreatedAt = DateTime.UtcNow;
            _jobs.Add(job);
            return Task.FromResult(job);
        }

        public Task<JobPosting> UpdateJobAsync(string id, JobPosting job)
        {
            var existingJob = _jobs.FirstOrDefault(j => j.Id == id);
            if (existingJob == null)
                return Task.FromResult<JobPosting>(null);

            existingJob.Title = job.Title;
            existingJob.Company = job.Company;
            existingJob.Location = job.Location;
            existingJob.Description = job.Description;
            existingJob.Requirements = job.Requirements;
            existingJob.Salary = job.Salary;
            existingJob.ContactEmail = job.ContactEmail;
            existingJob.Type = job.Type;
            existingJob.WorkMode = job.WorkMode;

            return Task.FromResult(existingJob);
        }

        public Task<bool> DeleteJobAsync(string id)
        {
            var job = _jobs.FirstOrDefault(j => j.Id == id);
            if (job == null)
                return Task.FromResult(false);

            _jobs.Remove(job);
            return Task.FromResult(true);
        }

        public Task<IEnumerable<JobPosting>> SearchJobsAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return Task.FromResult<IEnumerable<JobPosting>>(_jobs);

            searchTerm = searchTerm.ToLower();
            var result = _jobs.Where(j =>
                j.Title.ToLower().Contains(searchTerm) ||
                j.Company.ToLower().Contains(searchTerm) ||
                j.Description.ToLower().Contains(searchTerm)
            );
            return Task.FromResult<IEnumerable<JobPosting>>(result);
        }
    }
} 