using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class FeedbackProductRepository(ApplicationDbContext _dbContext) : GenericRepository<FeedbackProduct>(_dbContext), IFeedbackProductRepository
    {
    }
}
