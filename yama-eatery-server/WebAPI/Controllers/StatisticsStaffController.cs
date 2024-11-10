using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Staff))]
    public class StatisticsStaffController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("weekly-serving")]
        public async Task<IActionResult> GetWeeklyBookingServings()
        {
            var employee = await _unitOfWork.GetEmployeeFromHttpContextAsync(HttpContext);
            var bookings = await _unitOfWork.BookingRepository.GetAllAsync(["Employee"]);

            DateOnly startOfWeek = DateOnly.FromDateTime(DateTime.Now.AddDays(DateTime.Now.DayOfWeek - DayOfWeek.Saturday));
            DateOnly endOfWeek = startOfWeek.AddDays(7);

            List<double> weeklyBookings = [];
            for (int i = 0; i < 7; i++)
            {
                DateOnly currentDate = startOfWeek.AddDays(i);
                double totalInDay = bookings
                    .Where(x => x.BookingDate == currentDate && x.Employee?.Id == employee?.Id)
                    .Count();
                weeklyBookings.Add(totalInDay);
            }

            return Ok(weeklyBookings);
        }

        [HttpGet("weekly-revenues")]
        public async Task<IActionResult> GetWeeklyRevenues()
        {
            var employee = await _unitOfWork.GetEmployeeFromHttpContextAsync(HttpContext);
            var bookings = await _unitOfWork.BookingRepository.GetAllAsync(["Employee"]);

            DateOnly startOfWeek = DateOnly.FromDateTime(DateTime.Now.AddDays(DateTime.Now.DayOfWeek - DayOfWeek.Saturday));
            DateOnly endOfWeek = startOfWeek.AddDays(7);

            List<double> weeklyRevenues = [];
            for (int i = 0; i < 7; i++)
            {
                DateOnly currentDate = startOfWeek.AddDays(i);
                double totalInDay = bookings
                    .Where(x => x.BookingDate == currentDate && x.Employee?.Id == employee?.Id)
                    .Sum(x => x.TotalPayment);
                weeklyRevenues.Add(totalInDay);
            }

            var total = bookings.Where(x => x.Employee?.Id == employee?.Id && x.BookingDate >= startOfWeek && x.BookingDate < endOfWeek).Sum(x => x.TotalPayment);

            return Ok(new { total, data = weeklyRevenues });
        }
    }
}
