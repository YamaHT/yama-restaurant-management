using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Models.Enums;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class TableRepository(ApplicationDbContext _dbContext) : GenericRepository<Table>(_dbContext), ITableRepository
    {
    }
}
