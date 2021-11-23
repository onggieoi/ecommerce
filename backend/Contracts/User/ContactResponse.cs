using Microsoft.AspNetCore.Identity;

namespace backend.Contracts;

public class ContactResponse
{
  public Guid Id { get; set; }
  public string Number { get; set; }
  public string Type { get; set; }
}