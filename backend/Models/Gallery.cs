namespace backend.Models;

public class Gallery : BaseModel
{
  public string Url { get; set; }
  public Guid ProductId { get; set; }
}