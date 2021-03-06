namespace backend.Models;

public class OrderDetail : BaseModel
{
  public double SalePrice { get; set; }
  public int Quantity { get; set; }
  public Guid OrderId { get; set; }
  public Guid ProductId { get; set; }
  public Product Product { get; set; }
}