using backend.Contracts;
using backend.Models;

namespace backend.Services;

public interface IUserService
{
  Task<UserResponse> GetUserAsync();
  Task<UserResponse> AddUserAsync(UserRequest userRequest);
  Task<IEnumerable<CustomerResponse>> GetCustomersAsync();
}