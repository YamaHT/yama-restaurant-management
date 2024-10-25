using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<Employee?> GetByEmailAndPasswordAsync(string email, string password);
        Task<Employee?> GetByEmailAsync(string email);
        Task<bool> CheckEmailExistedAsync(string email);
        Task<List<Employee>> GetAllStaffsAsync();
    }
}
