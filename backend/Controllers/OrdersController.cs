using backend.Constants;
using backend.Contracts;
using backend.Helpers;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class OrdersController : BaseApiController<OrdersController>
{
  private IOrderService _orderService;

  public OrdersController(IOrderService orderService)
  {
    _orderService = orderService;
  }

  [HttpPost]
  public async Task<ActionResult<string>> CreateOrder([FromBody] OrderRequest request)
  {
    _logger.LogInformation("Create an order");

    var order = await _orderService.CreateOrderAsync(request);

    return Ok(order);
  }

  [HttpGet]
  [Route("{id}")]
  [Authorize]
  public async Task<ActionResult<string>> GetOrderDetail([FromRoute] Guid id)
  {
    _logger.LogInformation("Get order detail");

    var order = await _orderService.GetOrderDetailAsync(id);

    return Ok(order);
  }

  [HttpGet]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult<string>> GetOrders([FromQuery] string? search)
  {
    _logger.LogInformation("Get orders");

    var orders = await _orderService.GetOrdersAsync(search);

    return Ok(orders);
  }
}
