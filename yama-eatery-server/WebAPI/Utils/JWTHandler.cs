using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Models;
using WebAPI.Models.Enums;

namespace WebAPI.Utils
{
    public static class JWTHandler
    {
        public static string GenerateJwtUser(this User user, string secretKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, RoleEnum.Customer.ToString())
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GenerateJwtEmployee(this Employee employee, string secretKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString()),
                new Claim(ClaimTypes.Role, employee?.Position?.Name.ToString() ?? RoleEnum.Staff.ToString())
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static async Task<User?> GetUserFromHttpContextAsync(this IUnitOfWork unitOfWork, HttpContext context, string[]? includes = null)
        {
            var idClaims = int.TryParse(context.User.Claims
                                            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                                            out var id) ? id : 0;

            return await unitOfWork.UserRepository.GetByIdAsync(id, includes);
        }

        public static async Task<Employee?> GetEmployeeFromHttpContextAsync(this IUnitOfWork unitOfWork, HttpContext context, string[]? includes = null)
        {
            var idClaims = int.TryParse(context.User.Claims
                                            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                                            out var id) ? id : 0;

            return await unitOfWork.EmployeeRepository.GetByIdAsync(id, includes);
        }
    }
}
