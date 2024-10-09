using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IRoleRepository : IGenericRepository<Role> { }
    public interface ICategoryRepository : IGenericRepository<Category> { }
    public interface ITableTypeRepository : IGenericRepository<TableType> { }
}
