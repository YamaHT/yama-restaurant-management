using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;

namespace WebAPI.Repositories
{
    public class EmployeeRepository(ApplicationDbContext _dbContext) : GenericRepository<Employee>(_dbContext), IEmployeeRepository
    {
        public async Task<Employee?> GetByEmailAndPasswordAsync(string email, string password)
        {
            var employee = await _dbContext.Employee
                .Include(x => x.Position)
                .FirstOrDefaultAsync(x => x.Email == email);

            return CryptoUtil.IsPasswordCorrect(password, employee?.Password) ? employee : null;
        }

        public async Task<Employee?> GetByEmailAsync(string email)
        {
            return await _dbContext.Employee.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<bool> CheckEmailExistedAsync(string email)
        {
            return await _dbContext.Employee.AnyAsync(x => x.Email == email);
        }
    }
}
