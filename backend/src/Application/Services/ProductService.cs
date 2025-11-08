using Application.Contracts;
using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Services;

public class ProductService
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<ProductDto>> GetAsync(CancellationToken ct) =>
        (await _repo.GetAllAsync(ct)).Select(_mapper.Map<ProductDto>).ToList();

    public async Task<ProductDto?> GetByIdAsync(int id, CancellationToken ct)
    {
        var entity = await _repo.GetByIdAsync(id, ct);
        return entity is null ? null : _mapper.Map<ProductDto>(entity);
    }

    public async Task<ProductDto> CreateAsync(CreateUpdateProductDto dto, CancellationToken ct)
    {
        var entity = _mapper.Map<Product>(dto);
        var created = await _repo.AddAsync(entity, ct);
        return _mapper.Map<ProductDto>(created);
    }

    public async Task<bool> UpdateAsync(int id, CreateUpdateProductDto dto, CancellationToken ct)
    {
        var entity = await _repo.GetByIdAsync(id, ct);
        if (entity is null) return false;
        _mapper.Map(dto, entity);
        await _repo.UpdateAsync(entity, ct);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct)
    {
        var entity = await _repo.GetByIdAsync(id, ct);
        if (entity is null) return false;
        await _repo.DeleteAsync(entity, ct);
        return true;
    }
}
