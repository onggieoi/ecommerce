using backend.Constants;
using backend.Contracts;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class CategoriesController : BaseApiController<CategoriesController>
{
  private ICategoryService _categoryService;

  public CategoriesController(ICategoryService categoryService)
  {
    _categoryService = categoryService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetCategories()
  {
    var categories = await _categoryService.GetCaregoriesAsync();

    return Ok(categories);
  }

  [HttpPost]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult<CategoryResponse>> UpsertCategory(CategoryRequest request)
  {
    var category = await _categoryService.UpsertCategoryAsync(request);

    return Ok(category);
  }

  [HttpDelete]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult<CategoryResponse>> DeleteCategories(IEnumerable<Guid> ids)
  {
    await _categoryService.DeleteCategoryAsync(ids);
    return Ok();
  }
}