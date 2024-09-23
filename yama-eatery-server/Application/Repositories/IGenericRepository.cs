namespace Application.Repositories
{
	public interface IGenericRepository<T>
	{
		Task<List<T>> GetAllAsync(string[]? includes = null);
		Task<T?> GetByIdAsync(int id, string[]? includes = null);
		Task AddAsync(T entity);
		void Update(T entity);
		void Remove(T entity);
		void UpdateRange(List<T> entities);
	}
}
