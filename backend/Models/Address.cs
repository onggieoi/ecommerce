using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class Address : BaseModel
{
  public string Name { get; set; }
  public string Type { get; set; }
  public string Info { get; set; }
  public Guid UserId { get; set; }
}