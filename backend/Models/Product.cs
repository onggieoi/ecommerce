namespace backend.Models;

public class Product : BaseModel
{
  public string Title { get; set; }
  public string Unit { get; set; }
  public double Price { get; set; }
  public double SalePrice { get; set; }
  public string Description { get; set; }
  public int DiscountInPercent { get; set; }
  public int ProductQuantity { get; set; }
  public string Image { get; set; }
  public Guid CategoryId { get; set; }
  public Category Category { get; set; }
  public IEnumerable<Gallery> Gallery { get; set; }
}