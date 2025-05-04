using System.ComponentModel.DataAnnotations;
using Microsoft.Identity.Client;

namespace WebApplication1.Models
{
    public class Announcement
    {
        public int Id { get; set; }
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

        public bool IsActive { get; set; }
        public bool IsPinned { get; set; }

        [Required]
        public string CreatedBy { get; set; } = "Admin";

        public DateTime PublishDate { get; set; } = DateTime.UtcNow;
        public DateTime? ExpireDate { get; set; }

        public int ViewCount { get; set; } = 0;

        public DateTime CreateAT {  get; set; } = DateTime.UtcNow;
        public DateTime? UpdateAT { get;set; } = DateTime.UtcNow;

        public int? AuthorId { get; set; }
        public virtual User? Author { get; set; }
    }
}
