using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class ContactRepository(ApplicationDbContext _dbContext) : GenericRepository<Contact>(_dbContext), IContactRepository
    {
    }
}
