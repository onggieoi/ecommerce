namespace backend.Contracts;

public class CategoryResponse
{
  public Guid Id { get; set; }
  public string Icon { get; set; }
  public string Name { get; set; }
  public string Slug { get; set; }
  public string Type { get; set; }
}