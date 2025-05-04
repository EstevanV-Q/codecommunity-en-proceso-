using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs
{
    public class UserAdminDto
    {
        public UserAdminDto()
        {
            Email = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
            Role = "student";
            Status = "active";
            PreferencesJson = "{}";
            ProgressJson = "{}";
        }

        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsActive { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public string PreferencesJson { get; set; }
        public string ProgressJson { get; set; }
    }
}
