namespace WebApplication1.Models.DTOs
{
    public class CreateTicketRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Priority { get; set; } = "medium";
    }

    public class AssignTicketRequest
    {
        public int AgentId { get; set; }
    }

    public class ChangeStatusRequest
    {
        public string Status { get; set; } = "open";
    }

    public class AddMessageRequest
    {
        public string Message { get; set; } = string.Empty;
    }
}
