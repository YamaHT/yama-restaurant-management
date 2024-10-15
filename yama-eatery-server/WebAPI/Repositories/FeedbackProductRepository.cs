using Microsoft.EntityFrameworkCore;
using MimeKit.Tnef;
using WebAPI.Data;
using WebAPI.DTOs.Feedback;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class FeedbackProductRepository(ApplicationDbContext _dbContext) : GenericRepository<FeedbackProduct>(_dbContext), IFeedbackProductRepository
    {
        public async Task<FeedbackProduct?> GetByUserIdAndProductId(int userId, int productId)
        {
            return await _dbContext.FeedbackProduct.FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);
        }
    }
}
