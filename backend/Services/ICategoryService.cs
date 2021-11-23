using backend.Contracts;

namespace backend.Services;

public interface ICategoryService
{
  Task<IEnumerable<CategoryResponse>> GetCaregoriesAsync();
}