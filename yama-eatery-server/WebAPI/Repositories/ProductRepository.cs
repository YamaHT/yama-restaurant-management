using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class ProductRepository(ApplicationDbContext _dbContext) : GenericRepository<Product>(_dbContext), IProductRepository
    {
        public async Task<List<Product>> GetRandom10ProductsByCategoryName(string categoryName)
        {
            return await _dbContext.Product.Include(x => x.SubCategory).ThenInclude(x => x.Category)
                .Where(x => x.SubCategory.Category.Name.Equals(categoryName))
                .OrderBy(x => Guid.NewGuid())
                .Take(10)
                .ToListAsync();
        }
    }
}
