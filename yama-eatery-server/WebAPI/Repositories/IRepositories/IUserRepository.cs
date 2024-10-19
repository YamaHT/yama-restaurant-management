using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAndPasswordAsync(string email, string password);

        Task<bool> CheckEmailExistedAsync(string email);
        Task<User?> GetByEmailAsync(string email);

    }
}
