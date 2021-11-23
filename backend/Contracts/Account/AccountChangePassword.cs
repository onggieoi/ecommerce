namespace backend.Contracts;

public class AccountChangePassword
{
  public string CurrentPassword { get; set; }
  public string NewPassword { get; set; }
}