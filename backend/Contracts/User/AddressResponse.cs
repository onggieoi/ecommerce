using Microsoft.AspNetCore.Identity;

namespace backend.Contracts;

public class AddressResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; }
  public string Type { get; set; }
  public string Info { get; set; }
  public Guid UserId { get; set; }
}