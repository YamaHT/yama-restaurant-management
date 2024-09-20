using Application.Repositories;
using Application.Utils;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository(ApplicationDbContext _dbContext)
		: GenericRepository<User>(_dbContext), IUserRepository
	{
		public async Task<User?> GetUserByEmailAndPassword(string email, string password)
		{
			return await _dbContext.User
				.Include(x => x.Role)
				.FirstOrDefaultAsync(x => x.Email == email && CryptoUtils.IsPasswordCorrect(password, x.Password));
		}

		public async Task<bool> CheckEmailExisted(string email)
		{
			return await _dbContext.User.AnyAsync(x => x.Email == email);
		}
	}
}
