using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTOs
{
    public class ContactDTO
    {
        [Required(ErrorMessage = "El nombre es requerido.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "El email es requerido.")]
        [EmailAddress(ErrorMessage = "Ingresa un email válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "El asunto es requerido.")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "El mensaje es requerido.")]
        [MinLength(10, ErrorMessage = "El mensaje debe tener al menos 10 caracteres.")]
        public string Message { get; set; }

        public ContactDTO(string name, string email, string subject, string message)
        {
            Name = name;
            Email = email;
            Subject = subject;
            Message = message;
        }
    }
}
