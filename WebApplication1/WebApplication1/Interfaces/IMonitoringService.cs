using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models.DTOs.Monitoring;

namespace WebApplication1.Interfaces
{
    public interface IMonitoringService
    {
        Task<DashboardMetricsDto> GetDashboardMetricsAsync();
        Task<List<SystemLogDto>> GetLogsAsync(LogFilterDto filter);
        Task<List<SecurityEventDto>> GetSecurityEventsAsync(DateTime startDate, DateTime endDate);
        Task<CodeMetricsDto> GetLatestCodeMetricsAsync();
        Task<List<DeploymentDto>> GetRecentDeploymentsAsync(int count = 5);
        Task LogSecurityEventAsync(SecurityEventDto eventDto);
        Task<SystemMetricsDto> GetCurrentSystemMetricsAsync();
        Task<bool> IsSystemHealthyAsync();
    }
} 