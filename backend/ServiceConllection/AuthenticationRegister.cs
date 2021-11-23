using backend.Constants;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Text;

namespace backend.ServiceConllection
{
  public static class AuthenticationRegister
  {
    public static void AddAuthenticationRegister(this IServiceCollection services)
    {
      services.AddIdentity<User, IdentityRole<Guid>>(options =>
      {
        options.SignIn.RequireConfirmedAccount = false;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 5;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
      })
          .AddEntityFrameworkStores<ApplicationDbContext>()
          .AddDefaultTokenProviders();

      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
          .AddJwtBearer(o =>
          {
            o.RequireHttpsMetadata = false;
            o.SaveToken = false;
            o.TokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuerSigningKey = true,
              ValidateIssuer = true,
              ValidateAudience = true,
              ValidateLifetime = false,
              ClockSkew = TimeSpan.Zero,
              ValidIssuer = JWTSetting.Issuer,
              ValidAudience = JWTSetting.Audience,
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSetting.Key))
            };
            o.Events = new JwtBearerEvents()
            {
              OnAuthenticationFailed = c =>
                    {
                      c.NoResult();
                      c.Response.StatusCode = 500;
                      c.Response.ContentType = "text/plain";
                      return c.Response.WriteAsync(c.Exception.ToString());
                    },
              OnChallenge = context =>
                    {
                      context.HandleResponse();
                      context.Response.StatusCode = 401;
                      context.Response.ContentType = "application/json";
                      var result = JsonConvert.SerializeObject("You are not Authorized");
                      return context.Response.WriteAsync(result);
                    },
              OnForbidden = context =>
                    {
                      context.Response.StatusCode = 403;
                      context.Response.ContentType = "application/json";
                      var result = JsonConvert.SerializeObject("You are not authorized to access this resource");
                      return context.Response.WriteAsync(result);
                    },
            };
          });

      services.AddAuthorization(options =>
          {
            options.AddPolicy("Admin", policy => policy.RequireClaim(UserClaims.Role, Roles.Admin));
          });
    }
  }
}