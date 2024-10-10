using WebAPI.Repositories.IRepositories;

namespace WebAPI.Utils
{
    public interface IUnitOfWork
    {
        #region All EnumRepository
        public IRoleRepository RoleRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public ITableTypeRepository TableTypeRepository { get; }
        #endregion

        public IUserRepository UserRepository { get; }
        public IProductRepository ProductRepository { get; }
        public ITableRepository TableRepository { get; }

        public Task<int> SaveChangeAsync();
    }
}