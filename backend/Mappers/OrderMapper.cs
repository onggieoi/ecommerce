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
      CreateMap<OrderRequest, Order>().ReverseMap();
      CreateMap<OrderDetailRequest, OrderDetail>().ReverseMap();

      CreateMap<CouponRequest, Coupon>().ReverseMap();
      CreateMap<Coupon, CouponResponse>()
      .ForMember(cr => cr.TotalUsed, m => m.MapFrom(c => c.Orders.Count()))
      .ReverseMap();

    }
  }
}