using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs.Monitoring
{
    public class CodeMetricsDto
    {
        [Required]
        public string Repository { get; set; } = string.Empty;
        [Required]
        public int LinesOfCode { get; set; }
        [Required]
        [Range(0, 100)]
        public double CodeCoverage { get; set; }
        [Required]
        public int BugsCount { get; set; }
        [Required]
        public int VulnerabilitiesCount { get; set; }
        [Required]
        public int CodeSmells { get; set; }
        [Required]
        public int DuplicatedLines { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
    }
} 