using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class BookingRepository(ApplicationDbContext _dbContext) : GenericRepository<Booking>(_dbContext), IBookingRepository
    {
        public async Task<Booking?> GetByGuidAsync(int id, string[]? includes = null)
        {
            IQueryable<Booking> query = _dbContext.Booking;

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return await query.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<List<string>> GetAllBookedDayPartOfTableInDateAsync(int tableId, DateOnly date)
        {
            return await _dbContext.Booking
                .Include(x => x.Table)
                .Where(x => x.Table.Id == tableId && x.BookingDate == date)
                .Select(x => x.DayPart).ToListAsync();  
        }
    }
}
