namespace backend.Contracts;

public class OrderDetailResponse
{
  public Guid Id { get; set; }
  public int SalePrice { get; set; }
  public int Quantity { get; set; }
  public Guid OrderId { get; set; }
  public Guid ProductId { get; set; }
  public ProductResponse Product { get; set; }
}