using WebAPI.Repositories.IRepositories;

namespace WebAPI.Utils
{
    public interface IUnitOfWork
    {
        public IBookingDetailRepository BookingDetailRepository { get; }
        public IBookingRepository BookingRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IContactRepository ContactRepository { get; }
        public IFeedbackProductRepository FeedbackProductRepository { get; }
        public IProductRepository ProductRepository { get; }
        public ITableRepository TableRepository { get; }
        public IUserRepository UserRepository { get; }
        public IUserVoucherRepository UserVoucherRepository { get; }
        public IVoucherRepository VoucherRepository { get; }

        public Task<int> SaveChangeAsync();
    }
}