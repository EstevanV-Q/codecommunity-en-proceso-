using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class TicketMessage
    {
        public int Id { get; set; }
        [Required]
        public int TicketId { get; set; }
        public virtual Ticket? Ticket { get; set; }
        [Required]
        public int SenderId { get; set; }
        public virtual User? Sender { get; set; }
        [Required]
        public string Message { get; set; } = string.Empty;
        [Required]
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        [Required]
        public string SenderRole { get; set; } = string.Empty; // "user" o "support"
    }
}
