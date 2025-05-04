using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using System.Diagnostics;
using WebApplication1.Data;
using WebApplication1.Models.Monitoring;

namespace WebApplication1.Services
{
    public class SystemMetricsCollector : BackgroundService
    {
        private readonly IServiceProvider _services;
        private readonly IMemoryCache _cache;
        private readonly ILogger<SystemMetricsCollector> _logger;
        private readonly PeriodicTimer _timer;

        public SystemMetricsCollector(
            IServiceProvider services,
            IMemoryCache cache,
            ILogger<SystemMetricsCollector> logger)
        {
            _services = services;
            _cache = cache;
            _logger = logger;
            _timer = new PeriodicTimer(TimeSpan.FromMinutes(5)); // Recolectar cada 5 minutos
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                while (await _timer.WaitForNextTickAsync(stoppingToken))
                {
                    await CollectMetricsAsync();
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Metrics collection stopped");
            }
        }

        private async Task CollectMetricsAsync()
        {
            try
            {
                var metrics = GetCurrentMetrics();

                using var scope = _services.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                dbContext.SystemMetrics.Add(metrics);
                await dbContext.SaveChangesAsync();

                // Cachear las métricas más recientes
                _cache.Set("CurrentMetrics", metrics, TimeSpan.FromMinutes(6));

                _logger.LogInformation("System metrics collected successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error collecting system metrics");
            }
        }

        private SystemMetrics GetCurrentMetrics()
        {
            var process = Process.GetCurrentProcess();
            var metrics = new SystemMetrics
            {
                CpuUsage = process.TotalProcessorTime.TotalMilliseconds / Environment.ProcessorCount,
                MemoryUsage = process.WorkingSet64 / (1024.0 * 1024.0), // MB
                DiskUsage = GetDiskUsage(),
                ActiveConnections = 0, // Implementar según necesidades
                Timestamp = DateTime.UtcNow
            };

            return metrics;
        }

        private double GetDiskUsage()
        {
            var drive = new DriveInfo(AppDomain.CurrentDomain.BaseDirectory[0].ToString());
            return 100 - ((double)drive.AvailableFreeSpace / drive.TotalSize * 100);
        }
    }
} 