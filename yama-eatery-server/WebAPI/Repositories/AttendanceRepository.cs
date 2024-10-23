using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class AttendanceRepository(ApplicationDbContext _dbContext) : GenericRepository<Attendance>(_dbContext), IAttendanceRepository
    {
        public async Task<List<Attendance>> GetAllTodayAttendanceAsync()
        {
            var attendences = await _dbContext.Attendance
                                .Include(x => x.Employee)
                                .Where(x => x.Date == DateOnly.FromDateTime(DateTime.Now))
                                .ToListAsync();
            return attendences;
        }

        public async Task<List<Employee?>> GetAllStaffNotInTodayAttendanceAsync()
        {
            var employeesInAttendence = await _dbContext.Attendance
                                .Include(x => x.Employee)
                                .Where(x => x.Date == DateOnly.FromDateTime(DateTime.Now))
                                .Select(x => x.Employee)
                                .ToListAsync();

            var allEmployees = await _dbContext.Employee.ToListAsync();

            var employessNotInAttendence = allEmployees.Except(employeesInAttendence) ?? [];
            return employessNotInAttendence.ToList();
        }
    }
}
