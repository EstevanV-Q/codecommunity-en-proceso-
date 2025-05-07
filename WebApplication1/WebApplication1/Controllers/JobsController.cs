using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobPosting>>> GetAllJobs()
        {
            var jobs = await _jobService.GetAllJobsAsync();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobPosting>> GetJobById(string id)
        {
            var job = await _jobService.GetJobByIdAsync(id);
            if (job == null)
                return NotFound();

            return Ok(job);
        }

        [HttpPost]
        public async Task<ActionResult<JobPosting>> CreateJob(JobPosting job)
        {
            var createdJob = await _jobService.CreateJobAsync(job);
            return CreatedAtAction(nameof(GetJobById), new { id = createdJob.Id }, createdJob);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JobPosting>> UpdateJob(string id, JobPosting job)
        {
            var updatedJob = await _jobService.UpdateJobAsync(id, job);
            if (updatedJob == null)
                return NotFound();

            return Ok(updatedJob);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJob(string id)
        {
            var result = await _jobService.DeleteJobAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<JobPosting>>> SearchJobs([FromQuery] string term)
        {
            var jobs = await _jobService.SearchJobsAsync(term);
            return Ok(jobs);
        }
    }
} 