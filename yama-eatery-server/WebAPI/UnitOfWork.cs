using WebAPI.Data;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;

namespace WebAPI
{
    public class UnitOfWork(
    
        ApplicationDbContext dbContext,
        IUserRepository userRepository,
        IProductRepository productRepository,
        ITableRepository tableRepository) : IUnitOfWork
    {
        public IUserRepository UserRepository => userRepository;
        public IProductRepository ProductRepository => productRepository;
        public ITableRepository TableRepository => tableRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
