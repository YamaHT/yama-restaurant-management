using Application.Repositories;
using Infrastructure.Repositories;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using WebAPI.Middlewares;

namespace WebAPI
{
	public static class DependencyInjection	
	{
		public static IServiceCollection AddWebAPIService(this IServiceCollection services)
		{
			// Add Middleware services
			services.AddScoped<ExceptionHandlingMiddleware>();
			services.AddScoped<JWTAuthenticationMiddleware>();

			// Add other services
			services.AddControllers();
			services.AddEndpointsApiExplorer();
			services.AddHttpContextAccessor();

			// Add JWT service
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

			services.AddSwaggerGen(option =>
			{
				option.SwaggerDoc("v1", new OpenApiInfo
				{
					Title = "Yama Eatery System",
					Version = "v1"
				});

				option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					In = ParameterLocation.Header,
					Description = "Valid Token is needed",
					Name = "Authorization",
					Type = SecuritySchemeType.Http,
					BearerFormat = "JWT",
					Scheme = "Bearer"
				});

				option.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer"
							}
						},
						new string[] { }
					}
				});
			});
			return services;
		}
	}
}
