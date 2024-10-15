using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetUserByEmailAndPassword(string email, string password);

        Task<bool> CheckEmailExisted(string email);
        Task<User?> GetUserByEmail(string email);

    }
}
