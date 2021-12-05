using System.Net.Mime;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using backend.Contracts;
using backend.Data;
using backend.Exceptions;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Services;

public class ProductService : IProductService
{
  private ApplicationDbContext _dbContext;
  private IMapper _mapper;
  private IBlobService _blobService;

  public ProductService(ApplicationDbContext dbContext, IMapper mapper, IBlobService blobService)
  {
    _dbContext = dbContext;
    _mapper = mapper;
    _blobService = blobService;
  }

  public async Task<ProductResponse> GetProductAsync(string title)
  {
    var product = await _dbContext.Set<Product>()
      .Include(p => p.Category)
      .Include(p => p.Gallery)
      .AsNoTracking()
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

  public async Task<ProductResponse> UpsertProductAsync(ProductRequest request)
  {
    if (!string.IsNullOrEmpty(request.GalleryString))
    {
      request.Gallery = JsonConvert.DeserializeObject<IEnumerable<GalleryResponse>>(request.GalleryString);
    }

    var productQuery = _dbContext.Set<Product>().Where(p => p.Title == request.Title).AsQueryable();

    if (productQuery.Any())
    {
      throw new BadRequestException($"Product title {request.Title} already exists");
    }

    var product = _mapper.Map<Product>(request);

    if (request.ImageFile is not null)
    {
      var img = await _blobService.UploadImageAsync(request.ImageFile, request.Title);
      product.Image = img;
    }

    if (request.Id.HasValue)
    {
      var existProduct = await _dbContext.Set<Product>().FirstOrDefaultAsync(p => p.Id.Equals(request.Id));

      if (existProduct is null)
      {
        throw new NotFoundException($"Product {request.Id.ToString()} is invalid");
      }

      product.CreateAt = existProduct.CreateAt;

      _dbContext.Entry<Product>(existProduct).CurrentValues.SetValues(product);

      var holdedGalleryIds = product.Gallery.Select(g => g.Id);
      _dbContext.Gallery.RemoveRange(_dbContext.Gallery.Where(g => !holdedGalleryIds.Contains(g.Id) && g.ProductId.Equals(product.Id)));
    }
    else
    {
      await _dbContext.Set<Product>().AddAsync(product);
    }

    if (request.GalleryImages is not null)
    {
      var newGalleryImages = new List<Gallery>();

      foreach (var galleryImage in request.GalleryImages)
      {
        var img = await _blobService.UploadImageAsync(galleryImage, product.Title);
        var newGallery = new Gallery { Url = img, ProductId = product.Id };
        newGalleryImages.Add(newGallery);
      }

      await _dbContext.Set<Gallery>().AddRangeAsync(newGalleryImages);
    }


    await _dbContext.SaveChangesAsync();

    return _mapper.Map<ProductResponse>(product);
  }
}