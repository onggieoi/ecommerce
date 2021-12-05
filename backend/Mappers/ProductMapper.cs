using AutoMapper;
using backend.Contracts;
using backend.Models;

namespace backend.Mappers;
public class ProductMapper : Profile
{
  public ProductMapper()
  {
    // CreateMap<CartOrderRequest, CartDetail>().ReverseMap();
    CreateMap<ProductResponse, Product>().ReverseMap();
    CreateMap<Paging<ProductResponse>, Paging<Product>>().ReverseMap();
    CreateMap<ProductRequest, Product>()
      .ReverseMap();
  }
}