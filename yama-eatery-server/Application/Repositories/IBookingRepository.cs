using Domain.Models;

namespace Application.Repositories
{
    public interface IBookingRepository : IGenericRepository<Booking>
    {
        Task<List<Booking>> GetAllTodayBookingAsync();
    }
}
