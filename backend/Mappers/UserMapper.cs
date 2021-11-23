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
  }
}