using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class BookingRepository(ApplicationDbContext _dbContext) : GenericRepository<Booking>(_dbContext), IBookingRepository
    {
    }
}
