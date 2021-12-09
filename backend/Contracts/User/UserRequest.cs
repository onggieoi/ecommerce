using backend.Constants;

namespace backend.Contracts;

public class UserRequest
{
  public Guid? Id { get; set; }
  public string Name { get; set; }
  public string ContactNumber { get; set; }
  public IEnumerable<AddressResponse> Addresses { get; set; }
  public IEnumerable<CardResponse> Cards { get; set; }
  public IEnumerable<ContactResponse> Contacts { get; set; }
  public string? Password { get; set; }
  public string? UserName { get; set; }
}