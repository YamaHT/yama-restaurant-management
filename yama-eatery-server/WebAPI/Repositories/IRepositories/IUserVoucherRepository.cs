using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IUserVoucherRepository : IGenericRepository<UserVoucher>
    {
        Task<List<UserVoucher>> GetValidUserVouchersByUserId(int userId);
    }
}
