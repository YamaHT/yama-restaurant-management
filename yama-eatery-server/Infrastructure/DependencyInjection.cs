using Application;
using Application.Repositories;
using Application.Services;
using Infrastructure.Data;
using Infrastructure.Mappers;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructureService(this IServiceCollection services)
		{
			// Repository
			#region AddScoped() For EnumRepository
			services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IStatusRepository, StatusRepository>();
            services.AddScoped<ITableTypeRepository, TableTypeRepository>();
            services.AddScoped<IDeliveryRepository, DeliveryRepository>();
            #endregion
            services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IProductRepository, ProductRepository>();

			// Service
			services.AddScoped<IAuthService, AuthService>();

			// Others
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			services.AddDbContext<ApplicationDbContext>();

			services.AddAutoMapper(typeof(MappersConfigurationsProfile).Assembly);

			return services;
		}
	}
}
