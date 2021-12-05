using AutoMapper;
using backend.Constants;
using backend.Contracts;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService : IUserService
{
  private ApplicationDbContext _dbContext;
  private UserManager<User> _userManager;
  private IAuthenticatedUserService _authenticatedUser;
  private IMapper _mapper;

  public UserService(
    ApplicationDbContext dbContext,
    UserManager<User> userManager,
    IAuthenticatedUserService authenticatedUser,
    IMapper mapper)
  {
    _dbContext = dbContext;
    _userManager = userManager;
    _authenticatedUser = authenticatedUser;
    _mapper = mapper;
  }

  public async Task<UserResponse> AddUserAsync(UserRequest userRequest)
  {
    var user = _mapper.Map<User>(userRequest);

    var newUser = await _userManager.CreateAsync(user, userRequest.Password);

    if (!newUser.Succeeded)
    {
      throw new Exception();
    }

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<UserResponse> GetUserAsync()
  {
    var user = await _dbContext.Set<User>()
      .Include(u => u.Contacts)
      .Include(u => u.Cards)
      .Include(u => u.Addresses)
      .SingleOrDefaultAsync(u => u.Id.Equals(_authenticatedUser.Id));

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<IEnumerable<CustomerResponse>> GetCustomersAsync()
  {
    var users = await _dbContext.Set<User>()
      .AsNoTracking()
      .Include(u => u.Contacts)
      .Include(u => u.Cards)
      .Include(u => u.Addresses)
      .Include(u => u.Orders)
      .Where(u => u.Role.Equals(Roles.Customer))
      .ToListAsync();

    return _mapper.Map<IEnumerable<CustomerResponse>>(users);
  }
}