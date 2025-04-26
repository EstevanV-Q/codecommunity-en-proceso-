using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UserProfile
    {
        public UserProfile()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            Email = string.Empty;
            Bio = string.Empty;
            Location = string.Empty;
            ProfilePictureUrl = string.Empty;
            CreatedAt = DateTime.UtcNow;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(500)]
        public string Bio { get; set; }

        [StringLength(100)]
        public string Location { get; set; }

        [StringLength(255)]
        public string ProfilePictureUrl { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class UserProfileResponse
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class UpdateProfileRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
} 