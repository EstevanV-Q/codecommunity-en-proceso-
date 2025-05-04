using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models.DTOs.Monitoring;
using WebApplication1.Models.Monitoring;

namespace WebApplication1.Services
{
    public class MonitoringService : IMonitoringService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<MonitoringService> _logger;

        public MonitoringService(ApplicationDbContext context, ILogger<MonitoringService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<DashboardMetricsDto> GetDashboardMetricsAsync()
        {
            var metrics = new DashboardMetricsDto
            {
                SystemMetrics = await GetCurrentSystemMetricsAsync(),
                RecentSecurityEvents = await GetSecurityEventsAsync(DateTime.UtcNow.AddDays(-1), DateTime.UtcNow),
                RecentLogs = await GetLogsAsync(new LogFilterDto { PageSize = 10 }),
                CodeMetrics = await GetLatestCodeMetricsAsync(),
                RecentDeployments = await GetRecentDeploymentsAsync()
            };

            return metrics;
        }

        public async Task<List<SystemLogDto>> GetLogsAsync(LogFilterDto filter)
        {
            if (filter == null)
                throw new ArgumentNullException(nameof(filter));

            var query = _context.SystemLogs.AsQueryable();

            if (!string.IsNullOrEmpty(filter.Level))
                query = query.Where(l => l.Level == filter.Level);

            if (filter.StartDate.HasValue)
                query = query.Where(l => l.Timestamp >= filter.StartDate);

            if (filter.EndDate.HasValue)
                query = query.Where(l => l.Timestamp <= filter.EndDate);

            if (!string.IsNullOrEmpty(filter.Source))
                query = query.Where(l => l.Source.Contains(filter.Source));

            var logs = await query
                .OrderByDescending(l => l.Timestamp)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .Select(l => new SystemLogDto
                {
                    Level = l.Level,
                    Message = l.Message,
                    Source = l.Source,
                    Timestamp = l.Timestamp
                })
                .ToListAsync();

            return logs ?? new List<SystemLogDto>();
        }

        public async Task<List<SecurityEventDto>> GetSecurityEventsAsync(DateTime startDate, DateTime endDate)
        {
            var events = await _context.SecurityEvents
                .Where(e => e.Timestamp >= startDate && e.Timestamp <= endDate)
                .OrderByDescending(e => e.Timestamp)
                .Select(e => new SecurityEventDto
                {
                    EventType = e.EventType,
                    Description = e.Description,
                    IpAddress = e.IpAddress,
                    UserId = e.UserId,
                    Severity = e.Severity,
                    Timestamp = e.Timestamp
                })
                .ToListAsync();

            return events ?? new List<SecurityEventDto>();
        }

        public async Task<CodeMetricsDto> GetLatestCodeMetricsAsync()
        {
            var metrics = await _context.CodeMetrics
                .OrderByDescending(m => m.Timestamp)
                .FirstOrDefaultAsync();

            return new CodeMetricsDto
            {
                Repository = metrics?.Repository ?? string.Empty,
                LinesOfCode = metrics?.LinesOfCode ?? 0,
                CodeCoverage = metrics?.CodeCoverage ?? 0,
                BugsCount = metrics?.BugsCount ?? 0,
                VulnerabilitiesCount = metrics?.VulnerabilitiesCount ?? 0,
                CodeSmells = metrics?.CodeSmells ?? 0,
                DuplicatedLines = metrics?.DuplicatedLines ?? 0,
                Timestamp = metrics?.Timestamp ?? DateTime.UtcNow
            };
        }

        public async Task<List<DeploymentDto>> GetRecentDeploymentsAsync(int count = 5)
        {
            var deployments = await _context.Deployments
                .OrderByDescending(d => d.StartTime)
                .Take(count)
                .Select(d => new DeploymentDto
                {
                    Version = d.Version,
                    Environment = d.Environment,
                    Status = d.Status,
                    StartTime = d.StartTime,
                    EndTime = d.EndTime,
                    ErrorMessage = d.ErrorMessage,
                    DeployedBy = d.DeployedBy
                })
                .ToListAsync();

            return deployments ?? new List<DeploymentDto>();
        }

        public async Task LogSecurityEventAsync(SecurityEventDto eventDto)
        {
            if (eventDto == null)
                throw new ArgumentNullException(nameof(eventDto));

            var securityEvent = new SecurityEvent
            {
                EventType = eventDto.EventType,
                Description = eventDto.Description,
                IpAddress = eventDto.IpAddress,
                UserId = eventDto.UserId,
                Severity = eventDto.Severity,
                Timestamp = DateTime.UtcNow
            };

            _context.SecurityEvents.Add(securityEvent);
            await _context.SaveChangesAsync();
        }

        public async Task<SystemMetricsDto> GetCurrentSystemMetricsAsync()
        {
            var process = Process.GetCurrentProcess();
            var metrics = new SystemMetricsDto
            {
                CpuUsage = process.TotalProcessorTime.TotalMilliseconds / Environment.ProcessorCount,
                MemoryUsage = process.WorkingSet64 / (1024.0 * 1024.0), // MB
                DiskUsage = GetDiskUsage(),
                ActiveConnections = await GetActiveConnectionsCount(),
                Timestamp = DateTime.UtcNow
            };

            return metrics;
        }

        public async Task<bool> IsSystemHealthyAsync()
        {
            try
            {
                var metrics = await GetCurrentSystemMetricsAsync();
                return metrics.CpuUsage < 90 && // CPU usage below 90%
                       metrics.MemoryUsage < 90 && // Memory usage below 90%
                       metrics.DiskUsage < 90; // Disk usage below 90%
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking system health");
                return false;
            }
        }

        private double GetDiskUsage()
        {
            var drive = new DriveInfo(AppDomain.CurrentDomain.BaseDirectory[0].ToString());
            return 100 - ((double)drive.AvailableFreeSpace / drive.TotalSize * 100);
        }

        private async Task<int> GetActiveConnectionsCount()
        {
            // Aquí podrías implementar la lógica para contar conexiones activas
            // Por ejemplo, desde un servicio de gestión de sesiones
            return await Task.FromResult(0);
        }
    }
} 