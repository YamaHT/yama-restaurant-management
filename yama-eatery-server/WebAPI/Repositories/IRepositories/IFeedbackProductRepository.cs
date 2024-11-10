using WebAPI.DTOs.Feedback;
using WebAPI.Models;

namespace WebAPI.Repositories.IRepositories
{
    public interface IFeedbackProductRepository : IGenericRepository<FeedbackProduct>
    {
        Task<FeedbackProduct?> GetByUserIdAndProductId(int userId, int productId);
    }
}
