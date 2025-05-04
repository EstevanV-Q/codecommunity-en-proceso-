namespace WebApplication1.Models.DTOs
{
    public class DashboardMetricsDto
    {
        public SystemMetricsDto SystemMetrics { get; set; } = new();
        public List<SecurityEventDto> RecentSecurityEvents { get; set; } = new();
        public List<SystemLogDto> RecentLogs { get; set; } = new();
        public CodeMetricsDto CodeMetrics { get; set; } = new();
        public List<DeploymentDto> RecentDeployments { get; set; } = new();
    }

    public class SystemMetricsDto
    {
        public double CpuUsage { get; set; }
        public double MemoryUsage { get; set; }
        public double DiskUsage { get; set; }
        public int ActiveConnections { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class SecurityEventDto
    {
        public string EventType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public string Severity { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }

    public class SystemLogDto
    {
        public string Level { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }

    public class CodeMetricsDto
    {
        public string Repository { get; set; } = string.Empty;
        public int LinesOfCode { get; set; }
        public int CodeCoverage { get; set; }
        public int BugsCount { get; set; }
        public int VulnerabilitiesCount { get; set; }
        public int CodeSmells { get; set; }
        public int DuplicatedLines { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class DeploymentDto
    {
        public string Version { get; set; } = string.Empty;
        public string Environment { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? ErrorMessage { get; set; }
        public string? DeployedBy { get; set; }
    }

    public class LogFilterDto
    {
        public string? Level { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Source { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 50;
    }
} 