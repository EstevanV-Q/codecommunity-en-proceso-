namespace WebApplication1.Models.DTOs
{
    public class DashboardStatsDto
    {
        public int TotalTickets { get; set; }
        public int OpenTickets { get; set; }
        public int ResolvedTickets { get; set; }
        public double AverageResolutionTime { get; set; }
        public int CriticalTickets { get; set; }
        public double AverageRating { get; set; }
    }
}
