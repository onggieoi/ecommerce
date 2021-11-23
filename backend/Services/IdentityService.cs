using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using backend.Constants;
using backend.Contracts;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class IdentityService : IIdentityService
{
  private readonly UserManager<User> _userManager;
  private readonly SignInManager<User> _signInManager;
  private readonly ApplicationDbContext _dbContext;
  private readonly IAuthenticatedUserService _authenticatedUserService;
  private readonly IMapper _mapper;

  public IdentityService(UserManager<User> userManager,
      RoleManager<IdentityRole<Guid>> roleManager,
      IAuthenticatedUserService authenticatedUserService,
      ApplicationDbContext dbContext,
      IMapper mapper,
      SignInManager<User> signInManager)
  {
    _userManager = userManager;
    _signInManager = signInManager;
    _dbContext = dbContext;
    _authenticatedUserService = authenticatedUserService;
    _mapper = mapper;
  }

  public UserResponse GetInfo() => new UserResponse
  {
    Id = _authenticatedUserService.Id,
    Role = _authenticatedUserService.Role,
  };

  public async Task<UserResponse> ChangePassword(AccountChangePassword request)
  {
    var user = await _userManager.FindByNameAsync(_authenticatedUserService.UserName);

    if (user is null)
    {
      throw new Exception("Username is incorrect");
    }

    var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

    if (!result.Succeeded)
    {
      throw new Exception("Username or Passowrd is incorrect");
    }

    user.EmailConfirmed = true;
    await _userManager.UpdateAsync(user);

    var userResponse = _mapper.Map<UserResponse>(user);

    return userResponse;
  }

  public async Task<UserResponse> GetTokenAsync(AccountToken request)
  {
    var user = await _dbContext.Set<User>().SingleOrDefaultAsync(u => u.UserName.Equals(request.UserName));

    if (user is null)
    {
      throw new Exception("Username is incorrect");
    }

    var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

    if (!result.Succeeded)
    {
      throw new Exception("Invalid Username Or Passowrd");
    }

    JwtSecurityToken jwtSecurityToken = await GenerateJWToken(user);
    var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

    var userResponse = _mapper.Map<UserResponse>(user);
    userResponse.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

    return userResponse;
  }

  private async Task<JwtSecurityToken> GenerateJWToken(User user)
  {
    var userClaims = await _userManager.GetClaimsAsync(user);

    var claims = new[]
    {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(UserClaims.Id, user.Id.ToString()),
                // new Claim(UserClaims.FullName, user.FullName),
                // new Claim(UserClaims.Location, user.Location),
                new Claim(UserClaims.UserName, user.UserName),
                // new Claim(UserClaims.StaffCode, user.StaffCode),
                new Claim(UserClaims.Role, user.Role),
            }
    .Union(userClaims);

    return JWTGeneration(claims);
  }

  private JwtSecurityToken JWTGeneration(IEnumerable<Claim> claims)
  {
    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSetting.Key));
    var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

    var jwtSecurityToken = new JwtSecurityToken(
        issuer: JWTSetting.Issuer,
        audience: JWTSetting.Audience,
        claims: claims,
        notBefore: DateTime.UtcNow,
        // expires: DateTime.UtcNow.AddMinutes(JWTSettings.DurationInMinutes),
        signingCredentials: signingCredentials);
    return jwtSecurityToken;
  }
}