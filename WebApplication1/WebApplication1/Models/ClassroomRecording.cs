using System;

namespace WebApplication1.Models
{
    public class ClassroomRecording
    {
        public string Id { get; set; }
        public string ClassroomId { get; set; }
        public string CourseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public string ThumbnailPath { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public long DurationInSeconds { get; set; }
        public string Status { get; set; } // "recording", "processing", "completed", "failed"
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string RecordingUrl { get; set; }
        public string ThumbnailUrl { get; set; }
    }
} 