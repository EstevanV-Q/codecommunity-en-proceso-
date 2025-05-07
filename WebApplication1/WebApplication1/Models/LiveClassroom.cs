using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class LiveClassroom
    {
        public string Id { get; set; }
        public string CourseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string InstructorId { get; set; }
        public List<ClassroomParticipant> Participants { get; set; }
        public bool IsActive { get; set; }
        public string MeetingUrl { get; set; }
        public bool ShouldRecord { get; set; }
        public string RecordingId { get; set; }
        public string RecordingStatus { get; set; }
    }

    public class ClassroomParticipant
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Role { get; set; } // "instructor" or "student"
        public bool IsMuted { get; set; }
        public bool IsVideoEnabled { get; set; }
        public bool IsScreenSharing { get; set; }
        public DateTime JoinedAt { get; set; }
    }
} 