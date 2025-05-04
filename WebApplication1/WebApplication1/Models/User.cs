using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class User
    {
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

        [Required]
        public string Role { get; set; } = "user"; // "admin", "user", "moderator", etc.

        [Required]
        public string Status { get; set; } = "active"; // "active" | "inactive" | "banned"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string? EmailConfirmationToken { get; set; }

        public bool EmailConfirmed { get; set; }

        public string? PasswordResetToken { get; set; }

        public DateTime? PasswordResetTokenExpiry { get; set; }

        public DateTime? LastLoginAt { get; set; }

        public bool IsActive { get; set; } = true;

         
    // Opcional: si necesitas preferencias y progreso
        [Required]
        public string PreferencesJson { get; set; } // Almacena JSON de preferencias
        
        [Required]
        public string ProgressJson { get; set; } // Almacena JSON de progreso

        public User()
        {
            Email = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
            PasswordHash = string.Empty;
            PreferencesJson = "{}";
            ProgressJson = "{}";
        }

        public virtual UserProfile? Profile { get; set; }
    }
} 