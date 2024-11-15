﻿using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;

namespace WebAPI.Repositories
{
    public class UserRepository(ApplicationDbContext _dbContext)
        : GenericRepository<User>(_dbContext), IUserRepository
    {
        public async Task<User?> GetByEmailAndPasswordAsync(string email, string password)
        {
            var user = await _dbContext.User
                .FirstOrDefaultAsync(x => x.Email == email);

            return CryptoUtil.IsPasswordCorrect(password, user?.Password) ? user : null;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var user = await _dbContext.User
                .FirstOrDefaultAsync(x => x.Email == email);

            return user;
        }

        public async Task<bool> CheckEmailExistedAsync(string email)
        {
            return await _dbContext.User.AnyAsync(x => x.Email == email);
        }
       
    }
}
