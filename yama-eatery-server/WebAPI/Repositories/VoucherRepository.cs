using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class VoucherRepository(ApplicationDbContext _dbContext) : GenericRepository<Voucher>(_dbContext), IVoucherRepository
    {
    }
}
