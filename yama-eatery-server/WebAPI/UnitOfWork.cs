using WebAPI.Data;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;

namespace WebAPI
{
    public class UnitOfWork(
    #region All EnumRepository
         IRoleRepository roleRepository,
        ICategoryRepository categoryRepository,
        ITableTypeRepository tableTypeRepository,
    #endregion
        ApplicationDbContext dbContext,
        IUserRepository userRepository,
        IProductRepository productRepository) : IUnitOfWork
    {
        #region All EnumRepository
        public IRoleRepository RoleRepository => roleRepository;
        public ICategoryRepository CategoryRepository => categoryRepository;
        public ITableTypeRepository TableTypeRepository => tableTypeRepository;
        #endregion

        public IUserRepository UserRepository => userRepository;
        public IProductRepository ProductRepository => productRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
