using WebAPI.Data;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;

namespace WebAPI
{
    public class UnitOfWork(
        ApplicationDbContext dbContext,
        IBookingDetailRepository bookingDetailRepository,
        IBookingRepository bookingRepository,
        ICategoryRepository categoryRepository,
        IContactRepository contactRepository,
        IFeedbackProductRepository feedbackProductRepository,
        IProductRepository productRepository,
        ITableRepository tableRepository,
        IUserRepository userRepository,
        IUserVoucherRepository userVoucherRepository,
        IVoucherRepository voucherRepository) : IUnitOfWork
    {
        public IUserRepository UserRepository => userRepository;
        public IProductRepository ProductRepository => productRepository;
        public ITableRepository TableRepository => tableRepository;
        public IBookingDetailRepository BookingDetailRepository => bookingDetailRepository;
        public IBookingRepository BookingRepository => bookingRepository;
        public ICategoryRepository CategoryRepository => categoryRepository;
        public IContactRepository ContactRepository => contactRepository;
        public IFeedbackProductRepository FeedbackProductRepository => feedbackProductRepository;
        public IUserVoucherRepository UserVoucherRepository => userVoucherRepository;
        public IVoucherRepository VoucherRepository => voucherRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
