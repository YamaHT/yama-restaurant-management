using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class StatisticsManagerController(IUnitOfWork _unitOfWork) : ApiController
    {
        [HttpGet("total-feedbacks")]
        public async Task<IActionResult> GetTotalFeedbacks()
        {
            var feedbacks = await _unitOfWork.FeedbackProductRepository.GetAllAsync();
            var feedbackLastMonth = feedbacks.Count(x => x.CreationDate.Month == DateTime.Now.Month - 1);
            var feedbackThisMonth = feedbacks.Count(x => x.CreationDate.Month == DateTime.Now.Month);

            return Ok(new
            {
                count = feedbacks.Count,
                extra = feedbackThisMonth - feedbackLastMonth,
                percentage = feedbackLastMonth > 0 ? (double)(feedbackThisMonth - feedbackLastMonth) / feedbackLastMonth * 100 : 0
            });
        }

        [HttpGet("total-users")]
        public async Task<IActionResult> GetTotalUsers()
        {
            var users = await _unitOfWork.UserRepository.GetAllAsync();
            var userLastMonth = users.Count(x => x.CreationDate.Month == DateTime.Now.Month - 1);
            var userThisMonth = users.Count(x => x.CreationDate.Month == DateTime.Now.Month);

            return Ok(new
            {
                count = users.Count,
                extra = userThisMonth - userLastMonth,
                percentage = userLastMonth > 0 ? (double)(userThisMonth - userLastMonth) / userLastMonth * 100 : 0
            });
        }

        [HttpGet("total-bookings")]
        public async Task<IActionResult> GetTotalBookings()
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllAsync();
            var bookingLastMonth = bookings.Count(x => x.BookingDate.Month == DateTime.Now.Month - 1);
            var bookingThisMonth = bookings.Count(x => x.BookingDate.Month == DateTime.Now.Month);

            return Ok(new
            {
                count = bookings.Count,
                extra = bookingThisMonth - bookingLastMonth,
                percentage = bookingLastMonth > 0 ? (double)(bookingThisMonth - bookingLastMonth) / bookingLastMonth * 100 : 0
            });
        }

        [HttpGet("total-revenues")]
        public async Task<IActionResult> GetTotalRevenues()
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllAsync();
            var revenueLastMonth = bookings.Where(x => x.BookingDate.Month == DateTime.Now.Month - 1).Sum(x => x.TotalPayment);
            var revenueThisMonth = bookings.Where(x => x.BookingDate.Month == DateTime.Now.Month).Sum(x => x.TotalPayment);

            return Ok(new
            {
                count = bookings.Sum(x => x.TotalPayment),
                extra = revenueThisMonth - revenueLastMonth,
                percentage = revenueLastMonth > 0 ? (double)(revenueThisMonth - revenueLastMonth) / revenueLastMonth * 100 : 0
            });
        }

        [HttpGet("monthly-bookings")]
        public async Task<IActionResult> GetMonthlyBookings()
        {
            List<double> monthlyBookings = [];

            var bookings = await _unitOfWork.BookingRepository.GetAllAsync();
            for (int month = 1; month <= 12; month++)
            {
                var numberBookings = bookings.Count(x => x.BookingDate.Month == month);
                monthlyBookings.Add(numberBookings);
            }
            return Ok(monthlyBookings);
        }

        [HttpGet("weekly-revenues")]
        public async Task<IActionResult> GetWeeklyRevenues()
        {
            DateOnly startOfWeek = DateOnly.FromDateTime(DateTime.Now.AddDays(DateTime.Now.DayOfWeek - DayOfWeek.Saturday));
            DateOnly endOfWeek = startOfWeek.AddDays(7);

            var bookings = await _unitOfWork.BookingRepository.GetAllAsync();

            List<double> weeklyRevenues = [];
            for (int i = 0; i < 7; i++)
            {
                DateOnly currentDate = startOfWeek.AddDays(i);
                double totalInDay = bookings
                    .Where(x => x.BookingDate == currentDate)
                    .Sum(x => x.TotalPayment);
                weeklyRevenues.Add(totalInDay);
            }

            var total = bookings.Where(x => x.BookingDate >= startOfWeek && x.BookingDate < endOfWeek).Sum(x => x.TotalPayment);

            return Ok(new { total, data = weeklyRevenues });
        }

        [HttpGet("recent-bookings")]
        public async Task<IActionResult> GetRecentBookings()
        {
            var bookings = await _unitOfWork.BookingRepository.GetAllAsync(["BookingDetails", "Table"]);
            var recentBookings = bookings.Where(x => x.BookingDate <= DateOnly.FromDateTime(DateTime.Now)).OrderBy(x => x.BookingDate).Take(10);
            return Ok(recentBookings);
        }
    }
}
