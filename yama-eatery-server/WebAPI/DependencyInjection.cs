using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.OpenApi.Models;
using WebAPI.Data;
using WebAPI.Repositories;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;
using WebAPI.Utils.EmailSender;
using WebAPI.Utils.Middlewares;

namespace WebAPI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureService(this IServiceCollection services)
        {
            // Repository
            services.AddScoped<IBookingDetailRepository, BookingDetailRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IContactRepository, ContactRepository>();
            services.AddScoped<IFeedbackProductRepository, FeedbackProductRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ITableRepository, TableRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserVoucherRepository, UserVoucherRepository>();
            services.AddScoped<IVoucherRepository, VoucherRepository>();

            // Others
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddDbContext<ApplicationDbContext>();

            return services;
        }

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
