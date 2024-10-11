using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class BookingDetailRepository(ApplicationDbContext _dbContext) : GenericRepository<BookingDetail>(_dbContext), IBookingDetailRepository
    {
    }
}
