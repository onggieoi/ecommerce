
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.ServiceConllection
{
  public static class ServicesRegister
  {
    public static void AddServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddAuthenticationRegister();
      services.AddHttpContextAccessor();

      services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(config.GetConnectionString("DbConnection")));

      services.AddTransient<IAuthenticatedUserService, AuthenticatedUserService>();
      services.AddTransient<IIdentityService, IdentityService>();

      services.AddTransient<IProductService, ProductService>();
      services.AddTransient<ICategoryService, CategoryService>();
      services.AddTransient<IUserService, UserService>();
      services.AddTransient<IOrderService, OrderService>();

      services.AddAutoMapper(Assembly.GetExecutingAssembly());

      services.AddCors(options =>
        {
          options.AddPolicy("cors_policy",
              builder =>
              {
                builder.WithOrigins(config["Origins"])
                      .AllowAnyMethod()
                      .AllowAnyHeader();
              });
        });

      services.AddControllers()
        .AddJsonOptions(ops =>
          {
            ops.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            ops.JsonSerializerOptions.WriteIndented = true;
            ops.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            ops.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
            ops.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
          });

      services.AddEndpointsApiExplorer();
      services.AddSwagger();
    }
  }
}