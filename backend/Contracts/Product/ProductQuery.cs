namespace backend.Contracts;

public class ProductQuery
{
  public int Offset { get; set; } = 8;
  public int Page { get; set; } = 1;
  public string? Category { get; set; }
  public string? Search { get; set; }
}