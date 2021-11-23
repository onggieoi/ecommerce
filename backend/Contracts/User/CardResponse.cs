using Microsoft.AspNetCore.Identity;

namespace backend.Contracts;

public class CardResponse
{
  public Guid Id { get; set; }
  public string CardType { get; set; }
  public int LastFourDigit { get; set; }
  public string Name { get; set; }
  public string Type { get; set; }
}