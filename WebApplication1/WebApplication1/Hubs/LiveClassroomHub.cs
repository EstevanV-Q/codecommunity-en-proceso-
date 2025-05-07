using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebApplication1.Hubs
{
    public class LiveClassroomHub : Hub
    {
        public async Task JoinClassroom(string courseId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, courseId);
            await Clients.Group(courseId).SendAsync("UserJoined", Context.ConnectionId);
        }

        public async Task LeaveClassroom(string courseId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, courseId);
            await Clients.Group(courseId).SendAsync("UserLeft", Context.ConnectionId);
        }

        public async Task SendMessage(string courseId, string message)
        {
            await Clients.Group(courseId).SendAsync("ReceiveMessage", Context.ConnectionId, message);
        }

        public async Task ToggleMute(string courseId, string userId, bool isMuted)
        {
            await Clients.Group(courseId).SendAsync("UserMuted", userId, isMuted);
        }

        public async Task ToggleVideo(string courseId, string userId, bool isVideoEnabled)
        {
            await Clients.Group(courseId).SendAsync("UserVideoToggled", userId, isVideoEnabled);
        }

        public async Task StartScreenShare(string courseId, string userId)
        {
            await Clients.Group(courseId).SendAsync("ScreenShareStarted", userId);
        }

        public async Task StopScreenShare(string courseId, string userId)
        {
            await Clients.Group(courseId).SendAsync("ScreenShareStopped", userId);
        }

        public async Task RaiseHand(string courseId, string userId)
        {
            await Clients.Group(courseId).SendAsync("HandRaised", userId);
        }
    }
} 