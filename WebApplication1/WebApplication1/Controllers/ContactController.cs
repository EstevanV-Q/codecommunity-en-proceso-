using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interfaces;
using WebApplication1.Models.DTOs;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase // Asegúrate de heredar de ControllerBase
    {
        private readonly IEmailService _emailService; // Definición del servicio de email

        public ContactController(IEmailService emailService) // Constructor para inyección de dependencias
        {
            _emailService = emailService;
        }

        [HttpPost("contact")]
        public async Task<IActionResult> SendContactEmail([FromBody] ContactDTO contactRequest)
        {
            if (contactRequest == null)
                return BadRequest("Invalid request data."); // Respuesta BadRequest

            try
            {
                await _emailService.SendContactEmailAsync(contactRequest.Name, contactRequest.Email, contactRequest.Subject, contactRequest.Message);
                return Ok("Correo enviado exitosamente."); // Respuesta Ok
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al enviar el correo: {ex.Message}"); // Respuesta de error
            }
        }
    }
}