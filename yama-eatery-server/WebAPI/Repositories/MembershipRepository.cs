using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class MembershipRepository(ApplicationDbContext _dbContext) : GenericRepository<Membership>(_dbContext), IMembershipRepository
    {
    }
}
