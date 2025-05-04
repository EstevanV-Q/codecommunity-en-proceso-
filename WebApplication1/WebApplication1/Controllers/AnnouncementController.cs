using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interfaces;
using WebApplication1.Models.DTOs;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAll()
        {
            var announcements = await _announcementService.GetAllAsync();
            return Ok(announcements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetById(int id)
        {
            var announcement = await _announcementService.GetByIdAsync(id);
            if (announcement == null)
                return NotFound();
            return Ok(announcement);
        }

        [HttpPost]
        public async Task<ActionResult<Announcement>> Create([FromBody] AnnouncementDto dto)
        {
            var announcement = await _announcementService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = announcement.Id }, announcement);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Announcement>> Update(int id, [FromBody] AnnouncementDto dto)
        {
            var announcement = await _announcementService.UpdateAsync(id, dto);
            if (announcement == null)
                return NotFound();
            return Ok(announcement);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _announcementService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetByType(string type)
        {
            var announcements = await _announcementService.GetByTypeAsync(type);
            return Ok(announcements);
        }

        [HttpGet("audience/{audience}")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetByAudience(string audience)
        {
            var announcements = await _announcementService.GetByAudienceAsync(audience);
            return Ok(announcements);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetActive()
        {
            var announcements = await _announcementService.GetActiveAsync();
            return Ok(announcements);
        }

        [HttpGet("pinned")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetPinned()
        {
            var announcements = await _announcementService.GetPinnedAsync();
            return Ok(announcements);
        }
    }
}
