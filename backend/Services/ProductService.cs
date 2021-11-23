using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using backend.Contracts;
using backend.Data;
using backend.Exceptions;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProductService : IProductService
{
  private ApplicationDbContext _dbContext;
  private IMapper _mapper;

  public ProductService(ApplicationDbContext dbContext, IMapper mapper)
  {
    _dbContext = dbContext;
    _mapper = mapper;
  }

  public async Task<ProductResponse> GetProductAsync(string title)
  {
    var product = await _dbContext.Set<Product>()
      .Include(p => p.Category)
      .Include(p => p.Gallery)
      .SingleOrDefaultAsync(p => p.Title.ToLower().Contains(title.ToLower()));

    if (product is null)
    {
      throw new NotFoundException($"Product {title} Not Found");
    }

    return _mapper.Map<ProductResponse>(product);
  }

  public async Task<Paging<ProductResponse>> GetProductsAsync(ProductQuery query)
  {
    var productQuery = _dbContext.Set<Product>()
      .Include(p => p.Gallery)
      .Include(p => p.Category)
      .AsQueryable();

    if (!string.IsNullOrEmpty(query.Category))
    {
      productQuery = productQuery.Where(p => p.Category.Name.ToLower().Contains(query.Category.ToLower()));
    }

    if (!string.IsNullOrEmpty(query.Search))
    {
      productQuery = productQuery.Where(p => p.Title.ToLower().Contains(query.Search.ToLower()));
    }

    var products = await productQuery.PaginateAsync(query.Page, query.Offset);

    var productPagedResponse = _mapper.Map<Paging<ProductResponse>>(products);

    return productPagedResponse;
  }

  public async Task SeedProducts(List<Product> products)
  {
    await _dbContext.Set<Product>().AddRangeAsync(products);
    await _dbContext.SaveChangesAsync();
  }
}