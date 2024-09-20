using Domain.Models;

namespace Application.Repositories
{
	public interface IUserRepository : IGenericRepository<User>
	{
		Task<User?> GetUserByEmailAndPassword(string email, string password);

		Task<bool> CheckEmailExisted(string email);
	}
}
