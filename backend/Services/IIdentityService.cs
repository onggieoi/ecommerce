using backend.Contracts;

namespace backend.Services;

public interface IIdentityService
{
  Task<UserResponse> GetTokenAsync(AccountToken accountToken);

  UserResponse GetInfo();

  Task<UserResponse> ChangePassword(AccountChangePassword request);
}