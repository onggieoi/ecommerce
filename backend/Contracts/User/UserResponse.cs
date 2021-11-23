using Microsoft.AspNetCore.Identity;

namespace backend.Contracts;

public class UserResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; }
  public string ContactNumber { get; set; }
  public string Role { get; set; }
  public string Email { get; set; }
  public IEnumerable<AddressResponse> Addresses { get; set; }
  public IEnumerable<CardResponse> Cards { get; set; }
  public IEnumerable<ContactResponse> Contacts { get; set; }

  public string Token { get; set; }
}