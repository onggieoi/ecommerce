namespace backend.Models;

public class Category : BaseModel
{
  public string Icon { get; set; }
  public string Name { get; set; }
  public string Slug { get; set; }
  public string Type { get; set; }
  public IEnumerable<Product> Products { get; set; }
}