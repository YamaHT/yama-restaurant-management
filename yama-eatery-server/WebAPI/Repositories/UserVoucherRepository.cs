using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class UserVoucherRepository(ApplicationDbContext _dbContext) : GenericRepository<UserVoucher>(_dbContext), IUserVoucherRepository
    {
    }
}
