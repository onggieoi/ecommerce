using backend.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class TestsController : BaseApiController<TestsController>
{
  public TestsController()
  {
  }

  [HttpGet(Name = "Testin")]
  public async Task<ActionResult<string>> Get()
  {
    _logger.LogInformation("Testing hello");

    await Task.Delay(500);

    return Ok("Hello World");
  }
}
