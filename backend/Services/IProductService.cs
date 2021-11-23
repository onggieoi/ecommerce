using backend.Contracts;
using backend.Models;

namespace backend.Services;

public interface IProductService
{
  Task<Paging<ProductResponse>> GetProductsAsync(ProductQuery query);
  Task<ProductResponse> GetProductAsync(string title);
  Task SeedProducts(List<Product> products);

}