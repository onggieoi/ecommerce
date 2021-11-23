using System.Security.Claims;
using backend.Constants;

namespace backend.Services;

public class AuthenticatedUserService : IAuthenticatedUserService
{
  public Guid Id { get; }

  public string StaffCode { get; }

  public string Role { get; }

  public string Location { get; }

  public string UserName { get; }

  public string FullName { get; }

  public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
  {
    Id = new Guid(httpContextAccessor.HttpContext.User.FindFirstValue(UserClaims.Id) ?? new Guid().ToString());
    StaffCode = httpContextAccessor.HttpContext?.User?.FindFirstValue(UserClaims.StaffCode);
    Role = httpContextAccessor.HttpContext?.User?.FindFirstValue(UserClaims.Role);
    Location = httpContextAccessor.HttpContext?.User?.FindFirstValue(UserClaims.Location);
    UserName = httpContextAccessor.HttpContext?.User?.FindFirstValue(UserClaims.UserName);
    FullName = httpContextAccessor.HttpContext?.User?.FindFirstValue(UserClaims.FullName);
  }
}