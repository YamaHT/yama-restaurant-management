using WebAPI.Repositories.IRepositories;

namespace WebAPI.Utils
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }
        public IProductRepository ProductRepository { get; }
        public ITableRepository TableRepository { get; }

        public Task<int> SaveChangeAsync();
    }
}