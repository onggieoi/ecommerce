using backend.Contracts;

namespace backend.Services;

public interface ICategoryService
{
  Task<IEnumerable<CategoryResponse>> GetCaregoriesAsync();
  Task<CategoryResponse> UpsertCategoryAsync(CategoryRequest request);
  Task DeleteCategoryAsync(IEnumerable<Guid> ids);
}