namespace backend.Models;

public class Category : BaseModel
{
  public string Icon { get; set; }
  public string Name { get; set; }
  public IEnumerable<Product> Products { get; set; }
}