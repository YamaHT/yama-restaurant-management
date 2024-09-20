using Application.Repositories;
using Domain.Models;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class RoleRepository(ApplicationDbContext _dbContext) : GenericRepository<Role>(_dbContext), IRoleRepository { }

    public class CategoryRepository(ApplicationDbContext _dbContext) : GenericRepository<Category>(_dbContext), ICategoryRepository { }

    public class StatusRepository(ApplicationDbContext _dbContext) : GenericRepository<Status>(_dbContext), IStatusRepository { }

    public class TableTypeRepository(ApplicationDbContext _dbContext) : GenericRepository<TableType>(_dbContext), ITableTypeRepository { }

    public class DeliveryRepository(ApplicationDbContext _dbContext) : GenericRepository<Delivery>(_dbContext), IDeliveryRepository { }
}
