using backend.Models;

namespace backend.Contracts;

public class ProductResponse
{
  public Guid Id { get; set; }
  public string Title { get; set; }
  public string Unit { get; set; }
  public double Price { get; set; }
  public double SalePrice { get; set; }
  public string Description { get; set; }
  public int DiscountInPercent { get; set; }
  public int ProductQuantity { get; set; }
  public string Image { get; set; }
  public CategoryResponse Category { get; set; }
  public IEnumerable<GalleryResponse> Gallery { get; set; }
}