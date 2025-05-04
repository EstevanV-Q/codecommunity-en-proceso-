using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs
{
    public class UpdateUserProfileDto
    {
        public UpdateUserProfileDto()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            Email = string.Empty;
            Bio = string.Empty;
            Location = string.Empty;
            ProfilePictureUrl = string.Empty;
        }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(500)]
        public string Bio { get; set; }

        [StringLength(255)]
        public string Location { get; set; }

        [StringLength(255)]
        public string ProfilePictureUrl { get; set; }
    }
} 