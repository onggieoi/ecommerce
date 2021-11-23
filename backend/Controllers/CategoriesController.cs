using backend.Contracts;
using backend.Services;
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
}