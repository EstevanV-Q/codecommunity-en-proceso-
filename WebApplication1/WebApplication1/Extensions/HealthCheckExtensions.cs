using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.IO;

namespace WebApplication1.Extensions
{
    public static class HealthCheckExtensions
    {
        public static IHealthChecksBuilder AddDiskStorageHealthCheck(
            this IHealthChecksBuilder builder,
            Action<DiskStorageOptions> setup)
        {
            var options = new DiskStorageOptions();
            setup(options);

            return builder.AddCheck<DiskStorageHealthCheck>("DiskStorage");
        }
    }

    public class DiskStorageOptions
    {
        public Dictionary<string, long> Drives { get; } = new Dictionary<string, long>();

        public void AddDrive(string drivePath, long minimumFreeMegabytes)
        {
            Drives[drivePath] = minimumFreeMegabytes;
        }
    }

    public class DiskStorageHealthCheck : IHealthCheck
    {
        private readonly DiskStorageOptions _options;

        public DiskStorageHealthCheck(DiskStorageOptions options)
        {
            _options = options;
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            foreach (var drive in _options.Drives)
            {
                var driveInfo = new DriveInfo(drive.Key);
                var freeSpace = driveInfo.AvailableFreeSpace / (1024 * 1024); // Convertir a MB

                if (freeSpace < drive.Value)
                {
                    return Task.FromResult(
                        HealthCheckResult.Unhealthy(
                            $"Drive {drive.Key} has insufficient space. Available: {freeSpace}MB, Required: {drive.Value}MB"));
                }
            }

            return Task.FromResult(HealthCheckResult.Healthy("All drives have sufficient space"));
        }
    }
} 