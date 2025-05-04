using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/tickets")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public TicketController(ITicketService ticketService) { _ticketService = ticketService; }

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            // TODO: Reemplaza por la obtención real del usuario autenticado
            int userId = 1; // Simulado
            string role = "user"; // Simulado
            var tickets = await _ticketService.GetTicketsForUserAsync(userId, role);
            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            int userId = 1; // Simulado
            string role = "user"; // Simulado
            var ticket = await _ticketService.GetTicketByIdAsync(id, userId, role);
            if (ticket == null) return NotFound();
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] CreateTicketRequest req)
        {
            int userId = 1; // Simulado
            var ticket = await _ticketService.CreateTicketAsync(userId, req.Title, req.Description, req.Priority);
            return Ok(ticket);
        }

        [HttpPost("{id}/assign")]
        public async Task<IActionResult> AssignTicket(int id, [FromBody] AssignTicketRequest req)
        {
            var ok = await _ticketService.AssignTicketAsync(id, req.AgentId);
            if (!ok) return NotFound();
            return Ok();
        }

        [HttpPost("{id}/status")]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody] ChangeStatusRequest req)
        {
            int userId = 1; // Simulado
            string role = "user"; // Simulado
            var ok = await _ticketService.ChangeStatusAsync(id, req.Status, userId, role);
            if (!ok) return NotFound();
            return Ok();
        }

        [HttpGet("{id}/messages")]
        public async Task<IActionResult> GetMessages(int id)
        {
            int userId = 1; // Simulado
            string role = "user"; // Simulado
            var messages = await _ticketService.GetMessagesAsync(id, userId, role);
            return Ok(messages);
        }

        [HttpPost("{id}/messages")]
        public async Task<IActionResult> AddMessage(int id, [FromBody] AddMessageRequest req)
        {
            int userId = 1; // Simulado
            string role = "user"; // Simulado
            var msg = await _ticketService.AddMessageAsync(id, userId, role, req.Message);
            return Ok(msg);
        }

        [HttpGet("dashboard-stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            int userId = 1; // Simulado
            string role = "user"; // Simulado
            var stats = await _ticketService.GetDashboardStatsAsync(role, userId);
            return Ok(stats);
        }
    }
}
