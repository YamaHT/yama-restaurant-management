using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class PositionRepository(ApplicationDbContext _dbContext) : GenericRepository<Position>(_dbContext), IPositionRepository
    {
    }
}
