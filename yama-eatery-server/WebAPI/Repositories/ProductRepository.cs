using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class ProductRepository(ApplicationDbContext _dbContext) : GenericRepository<Product>(_dbContext), IProductRepository
    {
        public async Task<List<Product>> Get4HighestProductByPopularityScore(int minimumFeedbackCount, double minimumAverageRating)
        {
            var topProducts = await _dbContext.Product
                .Include(x => x.SubCategory).ThenInclude(x => x.Category)
                .Include(x => x.Feedbacks)
                .Where(x => x.Feedbacks.Count() > minimumFeedbackCount)
                .Where(x => x.Feedbacks.Average(f => f.Rating) >= minimumAverageRating)
                .Select(x => new
                {
                    Product = x,
                    PopularityScore = x.Feedbacks.Average(f => f.Rating) * x.Feedbacks.Count()
                })
                .OrderByDescending(x => x.PopularityScore)
                .Take(4)
                .ToListAsync();

            return topProducts.Select(x => x.Product).ToList();
        }


        public async Task<List<Product>> GetRandom10ProductsByCategoryName(string categoryName)
        {
            return await _dbContext.Product
                .Include(x => x.SubCategory).ThenInclude(x => x.Category)
                .Include(x => x.Feedbacks)
                .Where(x => x.SubCategory.Category.Name.Equals(categoryName) && !x.IsDeleted)
                .OrderBy(x => Guid.NewGuid())
                .Take(10)
                .ToListAsync();
        }
    }
}
