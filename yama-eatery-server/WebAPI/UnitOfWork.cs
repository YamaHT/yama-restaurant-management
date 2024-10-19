using WebAPI.Data;
using WebAPI.Repositories.IRepositories;
using WebAPI.Utils;

namespace WebAPI
{
    public class UnitOfWork(
        ApplicationDbContext dbContext,
        IAttendanceRepository attendanceRepository,
        IBookingDetailRepository bookingDetailRepository,
        IBookingRepository bookingRepository,
        ICategoryRepository categoryRepository,
        IContactRepository contactRepository,
        IEmployeeRepository employeeRepository,
        IFeedbackProductRepository feedbackProductRepository,
        IMembershipRepository membershipRepository,
        IProductRepository productRepository,
        ISalaryRepository salaryRepository,
        ITableRepository tableRepository,
        IUserRepository userRepository,
        IUserVoucherRepository userVoucherRepository,
        IVoucherRepository voucherRepository) : IUnitOfWork
    {
        public IAttendanceRepository AttendanceRepository => attendanceRepository;
        public IUserRepository UserRepository => userRepository;
        public IProductRepository ProductRepository => productRepository;
        public ITableRepository TableRepository => tableRepository;
        public IBookingDetailRepository BookingDetailRepository => bookingDetailRepository;
        public IBookingRepository BookingRepository => bookingRepository;
        public ICategoryRepository CategoryRepository => categoryRepository;
        public IContactRepository ContactRepository => contactRepository;
        public IFeedbackProductRepository FeedbackProductRepository => feedbackProductRepository;
        public IMembershipRepository MembershipRepository => membershipRepository;
        public IUserVoucherRepository UserVoucherRepository => userVoucherRepository;
        public IVoucherRepository VoucherRepository => voucherRepository;
        public IEmployeeRepository EmployeeRepository => employeeRepository;
        public ISalaryRepository SalaryRepository => salaryRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
