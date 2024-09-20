using Application.Repositories;

namespace Application
{
    public interface IUnitOfWork
    {
        #region All EnumRepository
        public IRoleRepository RoleRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IStatusRepository StatusRepository{ get; }
        public ITableTypeRepository TableTypeRepository { get; }
        public IDeliveryRepository DeliveryRepository { get; }
        #endregion

        public IUserRepository UserRepository { get; }

        public Task<int> SaveChangeAsync();
    }
}
