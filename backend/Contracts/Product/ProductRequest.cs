namespace backend.Contracts;

public class ProductRequest
{
  public Guid? Id { get; set; }
  public string Title { get; set; }
  public string Unit { get; set; }
  public int Price { get; set; }
  public int SalePrice { get; set; }
  public string Description { get; set; }
  public int DiscountInPercent { get; set; }
  public string? Image { get; set; }
  public IFormFile? ImageFile { get; set; }
  public Guid CategoryId { get; set; }
  public IEnumerable<IFormFile>? GalleryImages { get; set; }
  public IEnumerable<GalleryResponse>? Gallery { get; set; }
}