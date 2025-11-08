using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext ctx, CancellationToken ct = default)
    {
        // En InMemory no hay migraciones, igual garantizamos el modelo creado
        await ctx.Database.EnsureCreatedAsync(ct);

        if (await ctx.Products.AnyAsync(ct)) return;

        ctx.Products.AddRange(
            new Product { Name = "Keyboard", Description = "Mechanical", Price = 99.99m },
            new Product { Name = "Mouse", Description = "Wireless", Price = 49.99m },
            new Product { Name = "Monitor", Description = "27in", Price = 229.90m }
        );

        await ctx.SaveChangesAsync(ct);
    }
}
