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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get the current user's profile
        /// </summary>
        /// <returns>User profile information</returns>
        [HttpGet("profile")]
        [ProducesResponseType(typeof(UserProfile), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
                {
                    return Unauthorized(new { message = "User ID not found in token" });
                }

                var userId = int.Parse(userIdClaim.Value);
                var profile = await _userService.GetUserProfileAsync(userId);
                
                if (profile == null)
                {
                    return NotFound(new { message = "Profile not found" });
                }

                return Ok(profile);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update the current user's profile
        /// </summary>
        /// <param name="profileDto">Updated profile information</param>
        /// <returns>Updated user profile</returns>
        [HttpPut("profile")]
        [ProducesResponseType(typeof(UserProfile), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileDto profileDto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
                var updatedProfile = await _userService.UpdateUserProfileAsync(userId, profileDto);
                return Ok(updatedProfile);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Gestión de administradores
        [HttpGet("administrators")]
        public async Task<ActionResult<IEnumerable<UserAdminDto>>> GetAllAdministrators()
        {
            var users = await _userService.GetAllAdminAsync();
            return Ok(users);
        }

        [HttpGet("administrators/{id}")]
        public async Task<ActionResult<UserAdminDto>> GetAdministratorById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpPost("administrators")]
        public async Task<ActionResult<UserAdminDto>> CreateAdministrator([FromBody] UserCreateUpdateDto dto)
        {
            var user = await _userService.CreateAdminAsync(dto);
            return CreatedAtAction(nameof(GetAdministratorById), new { id = user.Id }, user);
        }

        [HttpPut("administrators/{id}")]
        public async Task<ActionResult<UserAdminDto>> UpdateAdministrator(int id, [FromBody] UserCreateUpdateDto dto)
        {
            var user = await _userService.UpdateAdminAsync(id, dto);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpDelete("administrators/{id}")]
        public async Task<IActionResult> DeleteAdministrator(int id)
        {
            var result = await _userService.DeleteAdminAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }

        [HttpPut("administrators/{id}/status")]
        public async Task<IActionResult> UpdateAdministratorStatus(int id, [FromBody] string status)
        {
            var result = await _userService.UpdateUserStatusAsync(id, status);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
} 