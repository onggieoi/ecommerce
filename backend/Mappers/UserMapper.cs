using AutoMapper;
using backend.Contracts;
using backend.Models;

namespace backend.Mappers;
public class UserMapper : Profile
{
  public UserMapper()
  {
    CreateMap<UserResponse, User>().ReverseMap();
    CreateMap<UserRequest, User>().ReverseMap();
    CreateMap<ContactResponse, Contact>().ReverseMap();
    CreateMap<AddressResponse, Address>().ReverseMap();
    CreateMap<CardResponse, Card>().ReverseMap();

    CreateMap<User, CustomerResponse>()
      .ForMember(cr => cr.TotalOrder, m => m.MapFrom(u => u.Orders.Count()))
      .ForMember(cr => cr.TotalAmount, m => m.MapFrom(u => TotalAmountCal(u.Orders)))
      .ReverseMap();
  }

  private double TotalAmountCal(IEnumerable<Order> orders)
  {
    double totalAmount = 0;

    foreach (var order in orders)
    {
      totalAmount += order.TotalPrice;
    }

    return totalAmount;
  }
}