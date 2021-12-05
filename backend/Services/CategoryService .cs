using AutoMapper;
using backend.Contracts;
using backend.Data;
using backend.Exceptions;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CategoryService : ICategoryService
{
  private ApplicationDbContext _dbContext;
  private IMapper _mapper;

  public CategoryService(ApplicationDbContext dbContext, IMapper mapper)
  {
    _dbContext = dbContext;
    _mapper = mapper;
  }
  public async Task<IEnumerable<CategoryResponse>> GetCaregoriesAsync()
  {
    var categories = await _dbContext.Set<Category>()
      .Include(c => c.Products)
      .AsNoTracking()
      .Where(c => !c.IsDeleted)
      .Select(c => new CategoryResponse
      {
        Id = c.Id,
        Name = c.Name,
        ProductTotal = c.Products.Count(),
      })
      .ToListAsync();

    return categories;
  }

  public async Task<CategoryResponse> UpsertCategoryAsync(CategoryRequest request)
  {
    var category = _mapper.Map<Category>(request);

    if (category.Id.Equals(Guid.Empty))
    {
      var existingCategory = _dbContext.Set<Category>().Where(c => c.Name.Equals(category.Name) && !c.IsDeleted).AsQueryable();

      if (existingCategory.Any())
      {
        throw new BadRequestException($"Category: {category.Name} is already exist");
      }

      await _dbContext.Set<Category>().AddAsync(category);
    }
    else
    {
      var existingCategory = await _dbContext.Set<Category>().FirstOrDefaultAsync(c => c.Id.Equals(category.Id));

      if (existingCategory is null)
      {
        throw new NotFoundException($"Category: {category.Name} is NotFound");
      }

      _dbContext.Entry<Category>(existingCategory).CurrentValues.SetValues(category);
    }

    await _dbContext.SaveChangesAsync();

    return _mapper.Map<CategoryResponse>(category);
  }

  public async Task DeleteCategoryAsync(IEnumerable<Guid> ids)
  {
    var categories = await _dbContext.Set<Category>().Where(c => ids.Contains(c.Id)).ToListAsync();

    categories.ForEach(c =>
    {
      c.IsDeleted = true;
    });

    await _dbContext.SaveChangesAsync();
  }
}