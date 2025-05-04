using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Status { get; set; } = "open"; // open, in_progress, resolved, closed
        [Required]
        public string Priority { get; set; } = "medium"; // low, medium, high, critical
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int? AssignedToId { get; set; }
        public virtual User? AssignedTo { get; set; }
        [Required]
        public int CreatedById { get; set; }
        public virtual User? CreatedBy { get; set; }
        public int? Rating { get; set; }
        public string? Feedback { get; set; }
        public DateTime? LastMessageAt { get; set; }
        public virtual ICollection<TicketMessage> Messages { get; set; } = new List<TicketMessage>();
    }
}
