using AutoMapper;
using backend.Contracts;
using backend.Models;

namespace backend.Mappers
{
  public class GalleryMapper : Profile
  {
    public GalleryMapper()
    {
      CreateMap<GalleryResponse, Gallery>().ReverseMap();
    }
  }
}