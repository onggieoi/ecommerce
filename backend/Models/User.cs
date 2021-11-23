using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser<Guid>
{
  public Guid Id { get; set; }
  public string Name { get; set; }
  public string ContactNumber { get; set; }
  public string Role { get; set; }
  public DateTime CreateAt { get; set; }
  public DateTime UpdateAt { get; set; }
  public IEnumerable<Address> Addresses { get; set; }
  public IEnumerable<Card> Cards { get; set; }
  public IEnumerable<Contact> Contacts { get; set; }
}