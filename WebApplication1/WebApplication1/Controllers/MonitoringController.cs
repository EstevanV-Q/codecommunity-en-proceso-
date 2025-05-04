using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Interfaces;
using WebApplication1.Models.DTOs.Monitoring;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = "admin,technical")]
    [ApiController]
    [Route("api/[controller]")]
    public class MonitoringController : ControllerBase
    {
        private readonly IMonitoringService _monitoringService;
        private readonly ILogger<MonitoringController> _logger;

        public MonitoringController(IMonitoringService monitoringService, ILogger<MonitoringController> logger)
        {
            _monitoringService = monitoringService;
            _logger = logger;
        }

        [HttpGet("dashboard")]
        public async Task<ActionResult<DashboardMetricsDto>> GetDashboardMetrics()
        {
            try
            {
                var metrics = await _monitoringService.GetDashboardMetricsAsync();
                return Ok(metrics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting dashboard metrics");
                return StatusCode(500, "Error retrieving dashboard metrics");
            }
        }

        [HttpGet("logs")]
        public async Task<ActionResult<List<SystemLogDto>>> GetLogs([FromQuery] LogFilterDto filter)
        {
            try
            {
                var logs = await _monitoringService.GetLogsAsync(filter);
                return Ok(logs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting logs");
                return StatusCode(500, "Error retrieving logs");
            }
        }

        [HttpGet("security/events")]
        public async Task<ActionResult<List<SecurityEventDto>>> GetSecurityEvents(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            try
            {
                var start = startDate ?? DateTime.UtcNow.AddDays(-1);
                var end = endDate ?? DateTime.UtcNow;
                var events = await _monitoringService.GetSecurityEventsAsync(start, end);
                return Ok(events);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting security events");
                return StatusCode(500, "Error retrieving security events");
            }
        }

        [HttpGet("code/metrics")]
        public async Task<ActionResult<CodeMetricsDto>> GetCodeMetrics()
        {
            try
            {
                var metrics = await _monitoringService.GetLatestCodeMetricsAsync();
                return Ok(metrics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting code metrics");
                return StatusCode(500, "Error retrieving code metrics");
            }
        }

        [HttpGet("deployments")]
        public async Task<ActionResult<List<DeploymentDto>>> GetDeployments([FromQuery] int count = 5)
        {
            try
            {
                var deployments = await _monitoringService.GetRecentDeploymentsAsync(count);
                return Ok(deployments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting deployments");
                return StatusCode(500, "Error retrieving deployments");
            }
        }

        [HttpGet("health")]
        public async Task<ActionResult<object>> GetHealthStatus()
        {
            try
            {
                var isHealthy = await _monitoringService.IsSystemHealthyAsync();
                var metrics = await _monitoringService.GetCurrentSystemMetricsAsync();

                return Ok(new
                {
                    IsHealthy = isHealthy,
                    Metrics = metrics,
                    Timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking system health");
                return StatusCode(500, "Error checking system health");
            }
        }

        [HttpPost("security/log")]
        public async Task<IActionResult> LogSecurityEvent([FromBody] SecurityEventDto eventDto)
        {
            try
            {
                await _monitoringService.LogSecurityEventAsync(eventDto);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error logging security event");
                return StatusCode(500, "Error logging security event");
            }
        }
    }
} 