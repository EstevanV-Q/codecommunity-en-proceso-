using WebApplication1.Data;
using WebApplication1.Interfaces;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.DTOs;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class TicketService : ITicketService
    {
        private readonly ApplicationDbContext _context;

        public TicketService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TicketDto>> GetTicketsForUserAsync(int userId, string role)
        {
            // Si es soporte/admin, devuelve todos. Si es usuario, solo los suyos.
            var query = _context.Tickets
                .Include(t => t.AssignedTo)
                .Include(t => t.CreatedBy)
                .AsQueryable();

            if (role == "user")
                query = query.Where(t => t.CreatedById == userId);

            var tickets = await query.ToListAsync();
            return tickets.Select(t => new TicketDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt,
                UpdatedAt = t.UpdatedAt,
                AssignedToId = t.AssignedToId,
                AssignedToName = (t.AssignedTo?.FirstName ?? "") + " " + (t.AssignedTo?.LastName ?? ""),
                CreatedById = t.CreatedById,
                CreatedByName = (t.CreatedBy?.FirstName ?? "") + " " + (t.CreatedBy?.LastName ?? ""),
                Rating = t.Rating,
                Feedback = t.Feedback,
                LastMessageAt = t.LastMessageAt
            }).ToList();
        }

        public async Task<TicketDto?> GetTicketByIdAsync(int ticketId, int userId, string role)
        {
            var ticket = await _context.Tickets
                .Include(t => t.AssignedTo)
                .Include(t => t.CreatedBy)
                .FirstOrDefaultAsync(t => t.Id == ticketId);

            if (ticket == null) return null;
            if (role == "user" && ticket.CreatedById != userId) return null;

            return new TicketDto
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Description = ticket.Description,
                Status = ticket.Status,
                Priority = ticket.Priority,
                CreatedAt = ticket.CreatedAt,
                UpdatedAt = ticket.UpdatedAt,
                AssignedToId = ticket.AssignedToId,
                AssignedToName = (ticket.AssignedTo?.FirstName ?? "") + " " + (ticket.AssignedTo?.LastName ?? ""),
                CreatedById = ticket.CreatedById,
                CreatedByName = (ticket.CreatedBy?.FirstName ?? "") + " " + (ticket.CreatedBy?.LastName ?? ""),
                Rating = ticket.Rating,
                Feedback = ticket.Feedback,
                LastMessageAt = ticket.LastMessageAt
            };
        }

        public async Task<TicketDto> CreateTicketAsync(int userId, string title, string description, string priority)
        {
            var ticket = new Ticket
            {
                Title = title,
                Description = description,
                Priority = priority,
                Status = "open",
                CreatedAt = DateTime.UtcNow,
                CreatedById = userId
            };
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return await GetTicketByIdAsync(ticket.Id, userId, "user") ?? throw new Exception("Ticket creation failed");
        }

        public async Task<bool> AssignTicketAsync(int ticketId, int agentId)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket == null) return false;
            ticket.AssignedToId = agentId;
            ticket.Status = "in_progress";
            ticket.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangeStatusAsync(int ticketId, string status, int userId, string role)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket == null) return false;
            if (role == "user" && ticket.CreatedById != userId) return false;
            ticket.Status = status;
            ticket.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<TicketMessageDto>> GetMessagesAsync(int ticketId, int userId, string role)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket == null) return new List<TicketMessageDto>();
            if (role == "user" && ticket.CreatedById != userId) return new List<TicketMessageDto>();

            var messages = await _context.TicketMessages
                .Where(m => m.TicketId == ticketId)
                .Include(m => m.Sender)
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            return messages.Select(m => new TicketMessageDto
            {
                Id = m.Id,
                TicketId = m.TicketId,
                SenderId = m.SenderId,
                SenderName = (m.Sender?.FirstName ?? "") + " " + (m.Sender?.LastName ?? ""),
                SenderRole = m.SenderRole,
                Message = m.Message,
                SentAt = m.SentAt
            }).ToList();
        }

        public async Task<TicketMessageDto> AddMessageAsync(int ticketId, int senderId, string senderRole, string message)
        {
            var msg = new TicketMessage
            {
                TicketId = ticketId,
                SenderId = senderId,
                SenderRole = senderRole,
                Message = message,
                SentAt = DateTime.UtcNow
            };
            _context.TicketMessages.Add(msg);

            // Actualiza la fecha del último mensaje en el ticket
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket != null)
            {
                ticket.LastMessageAt = msg.SentAt;
            }

            await _context.SaveChangesAsync();

            return new TicketMessageDto
            {
                Id = msg.Id,
                TicketId = msg.TicketId,
                SenderId = msg.SenderId,
                SenderName = (msg.Sender?.FirstName ?? "") + " " + (msg.Sender?.LastName ?? ""),
                SenderRole = msg.SenderRole,
                Message = msg.Message,
                SentAt = msg.SentAt
            };
        }

        public async Task<DashboardStatsDto> GetDashboardStatsAsync(string role, int? userId = null)
        {
            var query = _context.Tickets.AsQueryable();
            if (role == "user" && userId.HasValue)
                query = query.Where(t => t.CreatedById == userId.Value);

            var total = await query.CountAsync();
            var open = await query.CountAsync(t => t.Status == "open");
            var resolved = await query.CountAsync(t => t.Status == "resolved");
            var critical = await query.CountAsync(t => t.Priority == "critical");
            var avgRating = await query.AverageAsync(t => (double?)t.Rating) ?? 0;
            var avgResolutionTime = 0.0; // Calcula si tienes timestamps de resolución

            return new DashboardStatsDto
            {
                TotalTickets = total,
                OpenTickets = open,
                ResolvedTickets = resolved,
                CriticalTickets = critical,
                AverageRating = avgRating,
                AverageResolutionTime = avgResolutionTime
            };
        }
    }
}
