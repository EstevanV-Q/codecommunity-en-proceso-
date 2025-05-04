using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs.Monitoring
{
    public class SystemLogDto
    {
        [Required]
        public string Level { get; set; } = string.Empty;
        [Required]
        public string Message { get; set; } = string.Empty;
        [Required]
        public string Source { get; set; } = string.Empty;
        public string? StackTrace { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
    }

    public class LogFilterDto
    {
        public string? Level { get; set; }
        public string? Source { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [Range(1, int.MaxValue)]
        public int Page { get; set; } = 1;
        [Range(1, 100)]
        public int PageSize { get; set; } = 20;
    }
} 