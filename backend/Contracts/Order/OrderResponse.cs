namespace backend.Contracts;

public class OrderResponse
{
  public Guid Id { get; set; }
  public int TotalPrice { get; set; }
  public Guid UserId { get; set; }
  public Guid CouponId { get; set; }
  public IEnumerable<OrderDetailResponse> OrderDetails { get; set; }
  public Guid ContactId { get; set; }
  public ContactResponse Contact { get; set; }
  public Guid CardId { get; set; }
  public CardResponse Card { get; set; }
  public Guid AddressId { get; set; }
  public AddressResponse Address { get; set; }
  public DateTime CreateAt { get; set; }
}