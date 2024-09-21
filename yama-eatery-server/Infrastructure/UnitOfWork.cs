using Application;
using Application.Repositories;
using Infrastructure.Data;

namespace Infrastructure
{
    public class UnitOfWork(
    #region All EnumRepository
         IRoleRepository roleRepository,
        ICategoryRepository categoryRepository,
        IStatusRepository statusRepository,
        ITableTypeRepository tableTypeRepository,
        IDeliveryRepository deliveryRepository,
    #endregion
        ApplicationDbContext dbContext,
        IUserRepository userRepository,
        IProductRepository productRepository) : IUnitOfWork
    {
        #region All EnumRepository
        public IRoleRepository RoleRepository => roleRepository;
        public ICategoryRepository CategoryRepository => categoryRepository;
        public IStatusRepository StatusRepository => statusRepository;
        public ITableTypeRepository TableTypeRepository => tableTypeRepository;
        public IDeliveryRepository DeliveryRepository => deliveryRepository;
        #endregion

        public IUserRepository UserRepository => userRepository;
        public IProductRepository ProductRepository => productRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
