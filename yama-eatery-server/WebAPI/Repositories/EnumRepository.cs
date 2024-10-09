using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class RoleRepository(ApplicationDbContext _dbContext) : GenericRepository<Role>(_dbContext), IRoleRepository { }

    public class CategoryRepository(ApplicationDbContext _dbContext) : GenericRepository<Category>(_dbContext), ICategoryRepository { }

    public class TableTypeRepository(ApplicationDbContext _dbContext) : GenericRepository<TableType>(_dbContext), ITableTypeRepository { }
}
