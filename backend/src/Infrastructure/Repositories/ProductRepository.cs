using Application.Contracts;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _ctx;
    public ProductRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IReadOnlyList<Product>> GetAllAsync(CancellationToken ct) =>
        await _ctx.Products.AsNoTracking().OrderByDescending(p => p.CreatedAt).ToListAsync(ct);

    public Task<Product?> GetByIdAsync(int id, CancellationToken ct) =>
        _ctx.Products.FindAsync([id], ct).AsTask();

    public async Task<Product> AddAsync(Product product, CancellationToken ct)
    {
        _ctx.Products.Add(product);
        await _ctx.SaveChangesAsync(ct);
        return product;
    }

    public async Task UpdateAsync(Product product, CancellationToken ct)
    {
        _ctx.Products.Update(product);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Product product, CancellationToken ct)
    {
        _ctx.Products.Remove(product);
        await _ctx.SaveChangesAsync(ct);
    }
}
