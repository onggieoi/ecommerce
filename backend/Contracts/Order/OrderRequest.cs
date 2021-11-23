namespace backend.Contracts;

public class OrderRequest
{
  public Guid? CouponId { get; set; }
  public IEnumerable<OrderDetailRequest> OrderDetails { get; set; }
  public Guid ContactId { get; set; }
  public Guid CardId { get; set; }
  public Guid AddressId { get; set; }
}