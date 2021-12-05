using backend.Constants;
using backend.Contracts;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class ProductsController : BaseApiController<ProductsController>
{
  private IProductService _productService;

  public ProductsController(IProductService productService)
  {
    _productService = productService;
  }

  [HttpGet]
  public async Task<ActionResult> GetProducts([FromQuery] ProductQuery query)
  {
    var products = await _productService.GetProductsAsync(query);

    return Ok(products);
  }

  [HttpGet]
  [Route("{title}")]
  public async Task<ActionResult> Get([FromRoute] string title)
  {
    var product = await _productService.GetProductAsync(title);

    return Ok(product);
  }

  [HttpPost]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult> CreateProduct([FromForm] ProductRequest request)
  {
    var products = await _productService.UpsertProductAsync(request);

    return Ok(products);
  }
}
