using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class Contact : BaseModel
{
  public string Number { get; set; }
  public string Type { get; set; }
  public Guid UserId { get; set; }
}