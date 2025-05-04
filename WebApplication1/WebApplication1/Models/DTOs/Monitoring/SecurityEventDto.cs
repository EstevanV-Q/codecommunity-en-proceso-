using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs.Monitoring
{
    public class SecurityEventDto
    {
        [Required]
        public string EventType { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string IpAddress { get; set; } = string.Empty;
        public string? UserId { get; set; }
        [Required]
        public string Severity { get; set; } = "Info";
        [Required]
        public DateTime Timestamp { get; set; }
    }
} 