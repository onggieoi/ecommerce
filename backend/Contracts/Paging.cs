namespace backend.Contracts;

public class Paging<T>
{
  const int MaxPageSize = 50;
  private int _pageSize;
  public int PageSize
  {
    get => _pageSize;
    set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
  }

  public int CurrentPage { get; set; }
  public int TotalItems { get; set; }
  public int TotalPages { get; set; }
  public IEnumerable<T> Items { get; set; }
  public bool HasMore { get => CurrentPage < TotalPages; }

  public Paging()
  {
    Items = new List<T>();
  }
}