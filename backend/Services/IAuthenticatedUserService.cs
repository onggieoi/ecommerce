namespace backend.Services;

public interface IAuthenticatedUserService
{
  Guid Id { get; }
  string StaffCode { get; }
  string Role { get; }
  string Location { get; }
  string UserName { get; }
  string FullName { get; }
}