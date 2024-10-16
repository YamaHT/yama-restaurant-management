using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAndPassword(string email, string password);

        Task<bool> CheckEmailExisted(string email);
        Task<User?> GetByEmail(string email);

    }
}
