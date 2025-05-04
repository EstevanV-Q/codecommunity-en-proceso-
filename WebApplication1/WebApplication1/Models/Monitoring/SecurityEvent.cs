using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Monitoring
{
    public class SecurityEvent
    {
        public int Id { get; set; }
        [Required]
        public string EventType { get; set; } = string.Empty; // "Login", "Unauthorized", "Error"
        public string Description { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public string Severity { get; set; } = "Info"; // Info, Warning, Error, Critical
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
} 