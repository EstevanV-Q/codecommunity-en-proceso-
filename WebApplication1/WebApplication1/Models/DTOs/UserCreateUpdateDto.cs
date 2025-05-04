using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs
{
    public class UserCreateUpdateDto
    {
        public UserCreateUpdateDto()
        {
            Email = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
            Role = "student";
            Status = "active";
            PreferencesJson = "{}";
            ProgressJson = "{}";
        }

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
        public string Role { get; set; } = "student";
        public string Status { get; set; } = "active";
        public string PreferencesJson { get; set; }
        public string ProgressJson { get; set; }
    }
}