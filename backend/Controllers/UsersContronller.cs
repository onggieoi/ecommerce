using backend.Contracts;
using backend.Helpers;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class UsersController : BaseApiController<UsersController>
{
  private IUserService _userService;
  private IIdentityService _identityService;

  public UsersController(IUserService userService, IIdentityService identityService)
  {
    _userService = userService;
    _identityService = identityService;
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<ActionResult<UserResponse>> Get()
  {
    var user = await _userService.GetUserAsync();
    return Ok(user);
  }

  [HttpPost]
  // [Authorize("Admin")]
  [AllowAnonymous]
  public async Task<ActionResult<UserResponse>> CreateUser([FromBody] UserRequest userRequest)
  {
    var user = await _userService.AddUserAsync(userRequest);
    return Ok(user);
  }

  [HttpPost("token")]
  [AllowAnonymous]
  public async Task<ActionResult<UserResponse>> GetToken([FromBody] AccountToken account)
  {
    var user = await _identityService.GetTokenAsync(account);

    return Ok(user);
  }
}
