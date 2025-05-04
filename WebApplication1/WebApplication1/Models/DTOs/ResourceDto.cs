using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs
{
    public class ResourceDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Url { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Icon { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = string.Empty;

        public bool IsPublished { get; set; }
    }
} 