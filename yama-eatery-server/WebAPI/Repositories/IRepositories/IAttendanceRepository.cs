using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IAttendanceRepository : IGenericRepository<Attendance>
    {
        Task<List<Attendance>> GetAllTodayAttendanceAsync();
        Task<List<Employee?>> GetAllStaffNotInTodayAttendanceAsync();
    }
}
