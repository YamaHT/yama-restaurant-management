using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class CategoryRepository(ApplicationDbContext _dbContext) : GenericRepository<Category>(_dbContext), ICategoryRepository { }
}
