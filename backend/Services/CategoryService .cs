using AutoMapper;
using backend.Contracts;
using backend.Data;
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
    var categories = await _dbContext.Set<Category>().AsNoTracking().ToListAsync();

    return _mapper.Map<IEnumerable<CategoryResponse>>(categories);
  }
}