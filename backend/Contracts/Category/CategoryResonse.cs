namespace backend.Contracts;

public class CategoryResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; }

  public int ProductTotal { get; set; }
}