namespace WebAPI.Repositories.IRepositories
{
    public interface IGenericRepository<T>
    {
        Task<List<T>> GetAllAsync(string[]? includes = null);
        Task<List<T>> GetAllWithDeletedAsync(string[]? includes = null);
        Task<T?> GetByIdAsync(int id, string[]? includes = null);

        Task AddAsync(T entity);
        Task AddRangeAsync(List<T> entities);

        void Remove(T entity);

        void Update(T entity);
        void UpdateRange(List<T> entities);
    }
}
