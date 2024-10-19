using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class SubCategoryRepository(ApplicationDbContext _dbContext) : GenericRepository<SubCategory>(_dbContext), ISubCategoryRepository
    {
    }
}
