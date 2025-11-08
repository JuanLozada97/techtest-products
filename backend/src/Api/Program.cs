using Api.Mapping;
using Application.Contracts;
using Application.Services;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// 1) Registrar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontLocal", p =>
        p.WithOrigins("http://localhost:5173") // Vite dev server
         .AllowAnyHeader()
         .AllowAnyMethod()
         // .AllowCredentials() // <- solo si usas cookies/credentials
    );
});

// Controllers
builder.Services.AddControllers();

// Swagger (UI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

// DbContext (SQLite por defecto; cambia a SQL Server si tu cadena lo indica)
var cs = builder.Configuration.GetConnectionString("DefaultConnection")
         ?? throw new InvalidOperationException("Missing ConnectionStrings:DefaultConnection");

var provider = Environment.GetEnvironmentVariable("DB_PROVIDER")
              ?? builder.Configuration.GetValue<string>("DbProvider")
              ?? "InMemory"; // ← por defecto InMemory

builder.Services.AddDbContext<AppDbContext>(options =>
{
    switch (provider.ToLowerInvariant())
    {
        case "sqlserver": options.UseSqlServer(cs); break;
        case "inmemory":  options.UseInMemoryDatabase("TechTestDb"); break;
        default:          options.UseInMemoryDatabase("TechTestDb"); break;
    }
});


// DI
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductService>();

var app = builder.Build();

// Seed Data
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<Infrastructure.Persistence.AppDbContext>();
    await Infrastructure.Persistence.DataSeeder.SeedAsync(ctx);
}


// Swagger en Desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 2) Usar CORS antes de MapControllers
app.UseCors("AllowFrontLocal");

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
