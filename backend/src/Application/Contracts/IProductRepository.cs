using Domain.Entities;

namespace Application.Contracts;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetAllAsync(CancellationToken ct);
    Task<Product?> GetByIdAsync(int id, CancellationToken ct);
    Task<Product> AddAsync(Product product, CancellationToken ct);
    Task UpdateAsync(Product product, CancellationToken ct);
    Task DeleteAsync(Product product, CancellationToken ct);
}
