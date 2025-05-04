using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Interfaces
{
    public interface ITicketService
    {
        Task<List<TicketDto>> GetTicketsForUserAsync(int userId, string role);
        Task<TicketDto?> GetTicketByIdAsync(int ticketId, int userId, string role);
        Task<TicketDto> CreateTicketAsync(int userId, string title, string description, string priority);
        Task<bool> AssignTicketAsync(int ticketId, int agentId);
        Task<bool> ChangeStatusAsync(int ticketId, string status, int userId, string role);
        Task<List<TicketMessageDto>> GetMessagesAsync(int ticketId, int userId, string role);
        Task<TicketMessageDto> AddMessageAsync(int ticketId, int senderId, string senderRole, string message);
        Task<DashboardStatsDto> GetDashboardStatsAsync(string role, int? userId = null);
    }
}
