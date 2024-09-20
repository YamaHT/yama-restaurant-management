using Domain.Models;

namespace Application.Repositories
{
	public interface IRoleRepository : IGenericRepository<Role> { }
	public interface ICategoryRepository : IGenericRepository<Category> { }
    public interface IStatusRepository : IGenericRepository<Status> { }
    public interface ITableTypeRepository : IGenericRepository<TableType> { }
    public interface IDeliveryRepository : IGenericRepository<Delivery> { }
}
