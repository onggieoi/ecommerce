namespace backend.Models;

public class Order : BaseModel
{
  public double TotalPrice { get; set; }
  public Guid UserId { get; set; }
  public User User { get; set; }
  public Guid? CouponId { get; set; }
  public Coupon Coupon { get; set; }
  public IEnumerable<OrderDetail> OrderDetails { get; set; }
  public Guid ContactId { get; set; }
  public Contact Contact { get; set; }
  public Guid CardId { get; set; }
  public Card Card { get; set; }
  public Guid AddressId { get; set; }
  public Address Address { get; set; }
}