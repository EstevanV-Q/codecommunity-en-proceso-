using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Monitoring
{
    public class Deployment
    {
        public int Id { get; set; }
        [Required]
        public string Version { get; set; } = string.Empty;
        public string Environment { get; set; } = string.Empty; // Dev, Staging, Production
        public string Status { get; set; } = string.Empty; // Success, Failed, InProgress
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? ErrorMessage { get; set; }
        public string? DeployedBy { get; set; }
    }
} 