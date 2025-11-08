namespace Application.DTOs;

public record ProductDto(int Id, string Name, string? Description, decimal Price, DateTime CreatedAt);
