using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public record CreateUpdateProductDto(
    [Required, MinLength(2)] string Name,
    string? Description,
    [Range(0, double.MaxValue)] decimal Price
);
