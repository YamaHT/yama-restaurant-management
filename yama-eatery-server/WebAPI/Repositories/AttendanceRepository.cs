using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class AttendanceRepository(ApplicationDbContext _dbContext) : GenericRepository<Attendance>(_dbContext), IAttendanceRepository
    {
    }
}
