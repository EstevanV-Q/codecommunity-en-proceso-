using System;

namespace WebApplication1.Models.Monitoring
{
    public class CodeMetrics
    {
        public int Id { get; set; }
        public string Repository { get; set; } = string.Empty;
        public int LinesOfCode { get; set; }
        public double CodeCoverage { get; set; }
        public int BugsCount { get; set; }
        public int VulnerabilitiesCount { get; set; }
        public int CodeSmells { get; set; }
        public int DuplicatedLines { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
} 