using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class UserVoucherRepository(ApplicationDbContext _dbContext) : GenericRepository<UserVoucher>(_dbContext), IUserVoucherRepository
    {
        public async Task<List<UserVoucher>> GetValidUserVouchersByUserId(int userId)
        {
            return await _dbContext.UserVoucher
                .Include(x => x.Voucher)
                .Where(x => x.UserId == userId
                            && !x.IsUsed
                            && x.Voucher.ExpiredDate > DateOnly.FromDateTime(DateTime.Now)
                            && !x.Voucher.IsDeleted
                            && x.Voucher.Quantity > 0)
                .ToListAsync();
        }
    }
}
