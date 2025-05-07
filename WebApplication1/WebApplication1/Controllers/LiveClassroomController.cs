using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApplication1.Hubs;
using WebApplication1.Models;
using WebApplication1.Services;
using System;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LiveClassroomController : ControllerBase
    {
        private readonly IHubContext<LiveClassroomHub> _hubContext;
        private readonly IRecordingService _recordingService;

        public LiveClassroomController(
            IHubContext<LiveClassroomHub> hubContext,
            IRecordingService recordingService)
        {
            _hubContext = hubContext;
            _recordingService = recordingService;
        }

        [HttpPost("start")]
        public async Task<IActionResult> StartClassroom([FromBody] LiveClassroom classroom)
        {
            classroom.Id = Guid.NewGuid().ToString();
            classroom.StartTime = DateTime.UtcNow;
            classroom.IsActive = true;

            // Iniciar grabación si es necesario
            if (classroom.ShouldRecord)
            {
                var recording = await _recordingService.StartRecording(
                    classroom.Id,
                    classroom.CourseId,
                    classroom.InstructorId
                );
                classroom.RecordingId = recording.Id;
            }

            await _hubContext.Clients.Group(classroom.CourseId).SendAsync("ClassroomStarted", classroom);

            return Ok(classroom);
        }

        [HttpPost("end/{classroomId}")]
        public async Task<IActionResult> EndClassroom(string classroomId)
        {
            // Detener grabación si existe
            if (!string.IsNullOrEmpty(classroomId))
            {
                await _recordingService.StopRecording(classroomId);
            }

            await _hubContext.Clients.Group(classroomId).SendAsync("ClassroomEnded");

            return Ok();
        }

        [HttpGet("recordings/{classroomId}")]
        public async Task<IActionResult> GetClassroomRecordings(string classroomId)
        {
            var recording = await _recordingService.GetRecording(classroomId);
            return Ok(recording);
        }

        [HttpGet("status/{classroomId}")]
        public IActionResult GetClassroomStatus(string classroomId)
        {
            return Ok(new { isActive = true });
        }
    }
} 