using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Monitoring
{
    public class SystemMetrics
    {
        public int Id { get; set; }
        [Required]
        public double CpuUsage { get; set; }
        [Required]
        public double MemoryUsage { get; set; }
        [Required]
        public double DiskUsage { get; set; }
        [Required]
        public int ActiveConnections { get; set; }
        [Required]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
} 