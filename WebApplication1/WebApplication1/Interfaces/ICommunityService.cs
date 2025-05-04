using WebApplication1.Models.DTOs;

namespace WebApplication1.Interfaces
{
    public interface ICommunityService
    {
        Task<IEnumerable<PostDto>> GetPostsAsync();
        Task<PostDto?> GetPostByIdAsync(int id);
        Task<PostDto> CreatePostAsync(int userId, CreatePostDto postDto);
        Task<PostDto?> UpdatePostAsync(int id, int userId, UpdatePostDto postDto);
        Task<bool> DeletePostAsync(int id, int userId);
        Task<CommentDto> AddCommentAsync(int postId, int userId, CreateCommentDto commentDto);
        Task<bool> DeleteCommentAsync(int id, int userId);
        Task<bool> LikePostAsync(int postId, int userId);
        Task<bool> UnlikePostAsync(int postId, int userId);
        Task<bool> LikeCommentAsync(int commentId, int userId);
        Task<bool> UnlikeCommentAsync(int commentId, int userId);
    }
} 