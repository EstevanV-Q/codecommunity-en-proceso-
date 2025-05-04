using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class SupportAgent
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Role { get; set; } = "support"; // support, supportll, supportManager
        public bool IsActive { get; set; } = true;
        public int TicketsResolved { get; set; }
        public double AverageRating { get; set; }
    }
}
