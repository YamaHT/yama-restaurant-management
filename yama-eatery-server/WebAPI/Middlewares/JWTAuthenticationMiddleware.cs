using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace WebAPI.Middlewares
{
	public class JWTAuthenticationMiddleware(IConfiguration _configuration) : IMiddleware
	{
		private readonly string[] allowAnonymousAPI = { "Auth", "Product" };

		public async Task InvokeAsync(HttpContext context, RequestDelegate next)
		{
			if (allowAnonymousAPI.Any(path => context.Request.Path.StartsWithSegments($"/api/v1/{path}", StringComparison.OrdinalIgnoreCase)))
			{
				await next(context);
				return;
			}

			if (!context.Request.Headers.TryGetValue("Authorization", out var authorizationHeader) 
				|| !authorizationHeader.ToString().StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
			{
				await RespondWithUnauthorized(context);
				return;
			}

			try
			{
				string token = authorizationHeader.ToString()["Bearer ".Length..].Trim();
				ClaimsPrincipal claimsPrincipal = GetClaimPrincipal(token);
				context.User = claimsPrincipal;
			}
			catch (Exception)
			{
				await RespondWithUnauthorized(context);
				return;
			}

			await next(context);
		}

		private static async Task RespondWithUnauthorized(HttpContext context)
		{
			context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = "Unauthorized" }));
		}

		private ClaimsPrincipal GetClaimPrincipal(string jwtToken)
		{
			string secretKey = _configuration["JWT:SecretKey"];
			SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(secretKey));

			TokenValidationParameters tokenValidationParameters = new()
			{
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateLifetime = true,
				IssuerSigningKey = securityKey
			};

			JwtSecurityTokenHandler tokenHandler = new();
			return tokenHandler.ValidateToken(jwtToken, tokenValidationParameters, out _);
		}

	}
}
