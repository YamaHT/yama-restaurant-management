using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Models;

namespace WebAPI.Utils
{
    public static class JWTHandler
    {
        public static string GenerateJWT(this User user, string secretKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static async Task<User?> GetUserFromHttpContextAsync(this IUnitOfWork unitOfWork, HttpContext context)
        {
            var userIdClaims = int.TryParse(context.User.Claims
                                            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                                            out var userId) ? userId : 0;

            return await unitOfWork.UserRepository.GetByIdAsync(userId);
        }
    }
}
