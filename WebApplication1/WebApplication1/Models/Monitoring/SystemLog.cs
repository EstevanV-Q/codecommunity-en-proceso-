using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Monitoring
{
    public class SystemLog
    {
        public int Id { get; set; }
        [Required]
        public string Level { get; set; } = string.Empty; // Debug, Info, Warning, Error, Critical
        public string Message { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public string? StackTrace { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
} 