using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs.Monitoring
{
    public class SystemMetricsDto
    {
        [Required]
        public double CpuUsage { get; set; }
        [Required]
        public double MemoryUsage { get; set; }
        [Required]
        public double DiskUsage { get; set; }
        [Required]
        public int ActiveConnections { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
    }
} 