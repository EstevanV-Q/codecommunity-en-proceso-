using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs.Monitoring
{
    public class DashboardMetricsDto
    {
        [Required]
        public SystemMetricsDto SystemMetrics { get; set; } = new();
        [Required]
        public List<SecurityEventDto> RecentSecurityEvents { get; set; } = new();
        [Required]
        public List<SystemLogDto> RecentLogs { get; set; } = new();
        [Required]
        public CodeMetricsDto CodeMetrics { get; set; } = new();
        [Required]
        public List<DeploymentDto> RecentDeployments { get; set; } = new();
    }
} 