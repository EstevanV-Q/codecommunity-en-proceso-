using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs.Monitoring
{
    public class DeploymentDto
    {
        [Required]
        public string Version { get; set; } = string.Empty;
        [Required]
        public string Environment { get; set; } = string.Empty;
        [Required]
        public string Status { get; set; } = string.Empty;
        [Required]
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? ErrorMessage { get; set; }
        public string? DeployedBy { get; set; }
    }
} 