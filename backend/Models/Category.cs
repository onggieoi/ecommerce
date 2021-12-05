namespace backend.Models;

public class Category : BaseModel
{
  public string Name { get; set; }
  public IEnumerable<Product> Products { get; set; }
}