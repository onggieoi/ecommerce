namespace backend.Models;

public class Product : BaseModel
{
  public string Title { get; set; }
  public string Slug { get; set; }
  public string Unit { get; set; }
  public int Price { get; set; }
  public int SalePrice { get; set; }
  public string Description { get; set; }
  public int DiscountInPercent { get; set; }
  public string Type { get; set; }
  public string Image { get; set; }
  public Guid CategoryId { get; set; }
  public Category Category { get; set; }
  public IEnumerable<Gallery> Gallery { get; set; }
}