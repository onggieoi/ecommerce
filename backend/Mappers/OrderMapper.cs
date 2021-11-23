using AutoMapper;
using backend.Contracts;
using backend.Models;

namespace backend.Mappers
{
  public class OrderMapper : Profile
  {
    public OrderMapper()
    {
      CreateMap<OrderResponse, Order>().ReverseMap();
      CreateMap<OrderDetailResponse, OrderDetail>().ReverseMap();
      CreateMap<CouponResponse, Coupon>().ReverseMap();
      CreateMap<OrderRequest, Order>().ReverseMap();
      CreateMap<OrderDetailRequest, OrderDetail>().ReverseMap();
    }
  }
}