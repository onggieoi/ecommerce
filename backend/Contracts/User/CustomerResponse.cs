namespace backend.Contracts;

public class CustomerResponse : UserResponse
{
  public DateTime CreateAt { get; set; }
  public int TotalOrder { get; set; }
  public double TotalAmount { get; set; }
}