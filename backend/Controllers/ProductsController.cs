using backend.Contracts;
using backend.Helpers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers;

public class ProductsController : BaseApiController<ProductsController>
{
  private IProductService _productService;

  public ProductsController(IProductService productService)
  {
    _productService = productService;
  }

  [HttpGet]
  [Authorize]
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
}
