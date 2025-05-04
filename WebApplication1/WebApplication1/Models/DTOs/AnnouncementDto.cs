using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs
{
    public class AnnouncementDto
    {
        [Required]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        [StringLength(30)]
        public string Type { get; set; } = "general";
        [Required]
        [StringLength(30)]
        public string TargetAudience { get; set; } = "all";

        public bool IsActive { get; set; } = true;
        public bool IsPinned { get; set; } = false;

        [Required]
        public string CreatedBy { get; set; } = "Admin";

        public DateTime PublishDate { get; set; } = DateTime.UtcNow;
        public DateTime? ExpireDate { get; set; }
    }
}
