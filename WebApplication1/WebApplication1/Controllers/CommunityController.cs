using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommunityController : ControllerBase
    {
        private readonly ICommunityService _communityService;

        public CommunityController(ICommunityService communityService)
        {
            _communityService = communityService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts()
        {
            var posts = await _communityService.GetPostsAsync();
            return Ok(posts);
        }

        [HttpGet("thread/{id}")]
        public async Task<ActionResult<PostDto>> GetPost(int id)
        {
            var post = await _communityService.GetPostByIdAsync(id);
            if (post == null)
                return NotFound();
            return Ok(post);
        }

        [HttpPost]
        public async Task<ActionResult<PostDto>> CreatePost([FromBody] CreatePostDto postDto)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var post = await _communityService.CreatePostAsync(userId, postDto);
            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PostDto>> UpdatePost(int id, [FromBody] UpdatePostDto postDto)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var post = await _communityService.UpdatePostAsync(id, userId, postDto);
            if (post == null)
                return NotFound();
            return Ok(post);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var result = await _communityService.DeletePostAsync(id, userId);
            if (!result)
                return NotFound();
            return NoContent();
        }

        [HttpPost("{postId}/comments")]
        public async Task<ActionResult<CommentDto>> AddComment(int postId, [FromBody] CreateCommentDto commentDto)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var comment = await _communityService.AddCommentAsync(postId, userId, commentDto);
            return Ok(comment);
        }

        [HttpDelete("comments/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var result = await _communityService.DeleteCommentAsync(id, userId);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
} 