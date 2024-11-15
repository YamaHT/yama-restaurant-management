﻿using WebAPI.Repositories.IRepositories;

namespace WebAPI.Utils
{
    public interface IUnitOfWork
    {
        public IAttendanceRepository AttendanceRepository { get; }
        public IBookingDetailRepository BookingDetailRepository { get; }
        public IBookingRepository BookingRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IContactRepository ContactRepository { get; }
        public IEmployeeRepository EmployeeRepository { get; }
        public IFeedbackProductRepository FeedbackProductRepository { get; }
        public IMembershipRepository MembershipRepository { get; }
        public IProductRepository ProductRepository { get; }
        public IPositionRepository PositionRepository { get; }
        public ISalaryRepository SalaryRepository { get; }
        public ISubCategoryRepository SubCategoryRepository { get; }
        public ITableRepository TableRepository { get; }
        public IUserRepository UserRepository { get; }
        public IUserVoucherRepository UserVoucherRepository { get; }
        public IVoucherRepository VoucherRepository { get; }

        public Task<int> SaveChangeAsync();
    }
}