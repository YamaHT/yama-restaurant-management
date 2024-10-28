using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class AttendanceRepository(ApplicationDbContext _dbContext) : GenericRepository<Attendance>(_dbContext), IAttendanceRepository
    {
        public async Task<List<Attendance>> GetAllTodayAttendanceAsync()
        {
            var staffAttendance = await _dbContext.Attendance
                                .Include(x => x.Employee).ThenInclude(x => x.Position)
                                .Where(x => x.Date == DateOnly.FromDateTime(DateTime.Now)
                                         && x.Employee.Position.Name != PositionEnum.Manager.ToString())
                                .ToListAsync();
            return staffAttendance;
        }

        public async Task<List<Employee?>> GetAllStaffNotInTodayAttendanceAsync()
        {
            var staffInAttendence = await _dbContext.Attendance
                                .Include(x => x.Employee).ThenInclude(x => x.Position)
                                .Where(x => x.Date == DateOnly.FromDateTime(DateTime.Now)
                                         && x.Employee.Position.Name != PositionEnum.Manager.ToString())
                                .Select(x => x.Employee)
                                .ToListAsync();

            var allStaffs = await _dbContext.Employee.Include(x => x.Position)
                                .Where(x => x.Position.Name != PositionEnum.Manager.ToString())
                                .ToListAsync();

            var employessNotInAttendence = allStaffs.Except(staffInAttendence) ?? [];
            return employessNotInAttendence.ToList();
        }
    }
}
