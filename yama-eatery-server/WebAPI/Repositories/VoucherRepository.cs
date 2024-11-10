using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class VoucherRepository(ApplicationDbContext _dbContext) : GenericRepository<Voucher>(_dbContext), IVoucherRepository
    {
        public async Task<List<Voucher>> GetAllValidVoucherAsync()
        {
            return await _dbContext.Voucher
                .Where(v => v.Quantity > 0
                            && v.ExpiredDate > DateOnly.FromDateTime(DateTime.Now)
                            && !v.IsDeleted)
                .ToListAsync();
        }
    }
}
