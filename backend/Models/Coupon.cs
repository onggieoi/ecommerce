namespace backend.Models;

public class Coupon : BaseModel
{
  public int Discount { get; set; }
  public string Code { get; set; }
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public IEnumerable<Order> Orders { get; set; }
}