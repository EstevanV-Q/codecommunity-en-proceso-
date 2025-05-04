namespace WebApplication1.Models.DTOs
{
    public class TicketDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "open";
        public string Priority { get; set; } = "medium";
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? AssignedToId { get; set; }
        public string? AssignedToName { get; set; }
        public int CreatedById { get; set; }
        public string CreatedByName { get; set; } = string.Empty;
        public int? Rating { get; set; }
        public string? Feedback { get; set; }
        public DateTime? LastMessageAt { get; set; }
    }
}
