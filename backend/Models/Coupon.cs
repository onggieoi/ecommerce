namespace backend.Models;

public class Coupon : BaseModel
{
  public int Discount { get; set; }
  public string Code { get; set; }
}