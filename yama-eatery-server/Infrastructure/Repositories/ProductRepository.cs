using Application.Repositories;
using Domain.Models;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ProductRepository(ApplicationDbContext _dbContext) : GenericRepository<Product>(_dbContext), IProductRepository
    {
    }
}
