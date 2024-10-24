using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IVoucherRepository : IGenericRepository<Voucher>
    {
        Task<List<Voucher>> GetAllValidVoucherAsync();
    }
}
