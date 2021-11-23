using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class Card : BaseModel
{
  public string CardType { get; set; }
  public int LastFourDigit { get; set; }
  public string Name { get; set; }
  public string Type { get; set; }
  public Guid UserId { get; set; }
}