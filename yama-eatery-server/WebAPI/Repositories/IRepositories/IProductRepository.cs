using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<List<Product>> GetRandom10ProductsByCategoryName(string categoryName);
        Task<List<Product>> Get4HighestProductByPopularityScore(int minimumFeedbackCount, double minimumAverageRating);
    }
}
