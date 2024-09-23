using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IBookingDetailRepository : IGenericRepository<BookingDetail>
    {
        Task<BookingDetail> GetByBookingIdAndProductIdAsync(int bookingId, int productId);

        Task<List<BookingDetail>> GetAllByBookingIdAsync(int bookingId);
    }
}
