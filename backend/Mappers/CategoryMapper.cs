using AutoMapper;
using backend.Contracts;
using backend.Models;

namespace backend.Mappers;
public class CategoryMapper : Profile
{
  public CategoryMapper()
  {
    // CreateMap<CartOrderRequest, CartDetail>().ReverseMap();
    CreateMap<CategoryResponse, Category>().ReverseMap();
    CreateMap<CategoryRequest, Category>().ReverseMap();
  }
}