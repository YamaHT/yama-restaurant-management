using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Repositories.IRepositories;

namespace WebAPI.Repositories
{
    public class GenericRepository<T>(ApplicationDbContext _dbContext) : IGenericRepository<T> where T : class
    {
        // Function Get
        public async Task<List<T>> GetAllAsync(string[]? includes = null)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id, string[]? includes = null)
        {
            if (!typeof(BaseEntity).IsAssignableFrom(typeof(T)))
            {
                return null;
            }

            IQueryable<T> query = _dbContext.Set<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return await query.FirstOrDefaultAsync(x => (x as BaseEntity).Id == id);
        }

        // Function Process
        public async Task AddAsync(T entity)
        {
            if (entity is TrackableEntity trackableEntity)
            {
                trackableEntity.CreationDate = DateTime.Now;
            }

            await _dbContext.Set<T>().AddAsync(entity);
        }

        public void Remove(T entity)
        {
            if (entity is TrackableEntity trackableEntity)
            {
                trackableEntity.DeletionDate = DateTime.Now;
                trackableEntity.IsDeleted = true;
                _dbContext.Set<T>().Update(entity);
            }
            else
            {
                _dbContext.Set<T>().Remove(entity);
            }
        }

        public void Update(T entity)
        {
            if (entity is TrackableEntity trackableEntity)
            {
                trackableEntity.ModificationDate = DateTime.Now;
            }

            _dbContext.Set<T>().Update(entity);
        }

        public void UpdateRange(List<T> entities)
        {
            if (entities is List<TrackableEntity> listTrackable)
            {
                foreach (var entity in listTrackable)
                {
                    entity.ModificationDate = DateTime.Now;
                }
            }

            _dbContext.Set<T>().UpdateRange(entities);
        }
    }
}
