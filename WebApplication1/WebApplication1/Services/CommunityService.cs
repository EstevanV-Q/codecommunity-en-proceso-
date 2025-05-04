using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Services
{
    public class CommunityService : ICommunityService
    {
        private readonly ApplicationDbContext _context;

        public CommunityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PostDto>> GetPostsAsync()
        {
            var posts = await _context.Posts
                .Include(p => p.Author)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Author)
                .Include(p => p.Likes)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return posts.Select(p => MapPostToDto(p));
        }

        public async Task<PostDto?> GetPostByIdAsync(int id)
        {
            var post = await _context.Posts
                .Include(p => p.Author)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Author)
                .Include(p => p.Likes)
                .FirstOrDefaultAsync(p => p.Id == id);

            return post == null ? null : MapPostToDto(post);
        }

        public async Task<PostDto> CreatePostAsync(int userId, CreatePostDto postDto)
        {
            var post = new Post
            {
                Title = postDto.Title,
                Content = postDto.Content,
                AuthorId = userId,
                Category = postDto.Category,
                TagsJson = JsonSerializer.Serialize(postDto.Tags),
                CreatedAt = DateTime.UtcNow
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return await GetPostByIdAsync(post.Id) ?? throw new Exception("Post not found after creation");
        }

        public async Task<PostDto?> UpdatePostAsync(int id, int userId, UpdatePostDto postDto)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null || post.AuthorId != userId)
                return null;

            post.Title = postDto.Title;
            post.Content = postDto.Content;
            post.Category = postDto.Category;
            post.TagsJson = JsonSerializer.Serialize(postDto.Tags);
            post.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetPostByIdAsync(id);
        }

        public async Task<bool> DeletePostAsync(int id, int userId)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null || post.AuthorId != userId)
                return false;

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<CommentDto> AddCommentAsync(int postId, int userId, CreateCommentDto commentDto)
        {
            var comment = new Comment
            {
                Content = commentDto.Content,
                AuthorId = userId,
                PostId = postId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            await _context.Entry(comment)
                .Reference(c => c.Author)
                .LoadAsync();

            return MapCommentToDto(comment);
        }

        public async Task<bool> DeleteCommentAsync(int id, int userId)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null || comment.AuthorId != userId)
                return false;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LikePostAsync(int postId, int userId)
        {
            var existingLike = await _context.PostLikes
                .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

            if (existingLike != null)
                return false;

            _context.PostLikes.Add(new PostLike
            {
                PostId = postId,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlikePostAsync(int postId, int userId)
        {
            var like = await _context.PostLikes
                .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

            if (like == null)
                return false;

            _context.PostLikes.Remove(like);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LikeCommentAsync(int commentId, int userId)
        {
            var existingLike = await _context.CommentLikes
                .FirstOrDefaultAsync(l => l.CommentId == commentId && l.UserId == userId);

            if (existingLike != null)
                return false;

            _context.CommentLikes.Add(new CommentLike
            {
                CommentId = commentId,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlikeCommentAsync(int commentId, int userId)
        {
            var like = await _context.CommentLikes
                .FirstOrDefaultAsync(l => l.CommentId == commentId && l.UserId == userId);

            if (like == null)
                return false;

            _context.CommentLikes.Remove(like);
            await _context.SaveChangesAsync();
            return true;
        }

        private PostDto MapPostToDto(Post post)
        {
            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                AuthorName = post.Author?.FirstName + " " + post.Author?.LastName,
                AuthorId = post.AuthorId,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                Comments = post.Comments.Select(MapCommentToDto).ToList(),
                LikesCount = post.Likes.Count,
                Category = post.Category,
                Tags = JsonSerializer.Deserialize<List<string>>(post.TagsJson) ?? new List<string>()
            };
        }

        private CommentDto MapCommentToDto(Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                AuthorName = comment.Author?.FirstName + " " + comment.Author?.LastName,
                AuthorId = comment.AuthorId,
                CreatedAt = comment.CreatedAt,
                UpdatedAt = comment.UpdatedAt,
                LikesCount = comment.Likes.Count
            };
        }
    }
} 