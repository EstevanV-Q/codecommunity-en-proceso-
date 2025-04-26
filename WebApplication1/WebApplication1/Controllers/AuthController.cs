using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// Controller for handling authentication operations
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="request">User registration details</param>
        /// <returns>Authentication response with JWT token</returns>
        /// <response code="200">Returns the authentication response</response>
        /// <response code="400">If the request is invalid or email already exists</response>
        [HttpPost("register")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var response = await _authService.RegisterAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Login a user
        /// </summary>
        /// <param name="request">User login credentials</param>
        /// <returns>Authentication response with JWT token</returns>
        /// <response code="200">Returns the authentication response</response>
        /// <response code="401">If the credentials are invalid</response>
        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var response = await _authService.LoginAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Request a password reset
        /// </summary>
        /// <param name="request">Email address for password reset</param>
        /// <returns>Success message</returns>
        /// <response code="200">If the reset email was sent successfully</response>
        /// <response code="400">If the request is invalid</response>
        [HttpPost("forgot-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                await _authService.ForgotPasswordAsync(request.Email);
                return Ok(new { message = "Password reset email sent" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Reset password using token
        /// </summary>
        /// <param name="request">Password reset details</param>
        /// <returns>Success message</returns>
        /// <response code="200">If the password was reset successfully</response>
        /// <response code="400">If the token is invalid or expired</response>
        [HttpPost("reset-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            try
            {
                await _authService.ResetPasswordAsync(request);
                return Ok(new { message = "Password reset successful" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Confirm email address
        /// </summary>
        /// <param name="token">Email confirmation token</param>
        /// <returns>Success message</returns>
        /// <response code="200">If the email was confirmed successfully</response>
        /// <response code="400">If the token is invalid</response>
        [HttpGet("confirm-email")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string token)
        {
            try
            {
                await _authService.ConfirmEmailAsync(token);
                return Ok(new { message = "Email confirmed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Change user password
        /// </summary>
        /// <param name="request">Password change details</param>
        /// <returns>Success message</returns>
        /// <response code="200">If the password was changed successfully</response>
        /// <response code="400">If the current password is incorrect</response>
        /// <response code="401">If the user is not authenticated</response>
        [Authorize]
        [HttpPost("change-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized(new { message = "User ID not found in token" });
                }

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return BadRequest(new { message = "Invalid user ID format" });
                }

                await _authService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);
                return Ok(new { message = "Password changed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? throw new ArgumentNullException(nameof(_configuration), "JWT Key is missing");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email ?? throw new ArgumentNullException(nameof(user.Email), "User email is missing"))
            };

            if (!string.IsNullOrEmpty(user.FirstName))
            {
                claims.Add(new Claim(ClaimTypes.GivenName, user.FirstName));
            }

            if (!string.IsNullOrEmpty(user.LastName))
            {
                claims.Add(new Claim(ClaimTypes.Surname, user.LastName));
            }

            var jwtIssuer = _configuration["Jwt:Issuer"] ?? throw new ArgumentNullException(nameof(_configuration), "JWT Issuer is missing");
            var jwtAudience = _configuration["Jwt:Audience"] ?? throw new ArgumentNullException(nameof(_configuration), "JWT Audience is missing");
            var expiryMinutes = int.TryParse(_configuration["Jwt:ExpiryInMinutes"], out var minutes) ? minutes : 60;

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
} 