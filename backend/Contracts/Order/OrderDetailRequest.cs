namespace backend.Contracts;

public class OrderDetailRequest
{
  public int Quantity { get; set; }
  public Guid ProductId { get; set; }
}