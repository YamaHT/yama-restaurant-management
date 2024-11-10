using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class SalaryRepository(ApplicationDbContext _dbContext) : GenericRepository<Salary>(_dbContext), ISalaryRepository
    {
    }
}
