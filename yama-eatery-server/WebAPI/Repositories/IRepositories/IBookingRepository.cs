using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IBookingRepository : IGenericRepository<Booking>
    {
        Task<Booking?> GetByGuidAsync(Guid id, string[]? includes = null);
        Task<List<string?>> GetAllBookedDayPartOfTableInDateAsync(int tableId, DateOnly date);
        Task<List<Booking>> GetAllBookingInDateAndDayPartAsync(DateOnly date, string dayPart);
        Task<List<Booking>> GetAllBookedInvoiceInDateAndDayPartAsync(DateOnly date, string dayPart);
    }
}
