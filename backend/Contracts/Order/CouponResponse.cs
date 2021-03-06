namespace backend.Contracts;

public class CouponResponse
{
  public Guid Id { get; set; }
  public int Discount { get; set; }
  public string Code { get; set; }
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public int TotalUsed { get; set; }
}