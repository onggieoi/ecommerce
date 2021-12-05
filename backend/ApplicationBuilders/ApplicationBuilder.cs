
using backend.Middlewares;

namespace backend.ApplicationBuilders
{
  public static class ApplicationBuilder
  {
    public static void UseApplicationBuilder(this IApplicationBuilder applicationBuilder, bool isDevelopment)
    {
      if (isDevelopment)
      {
        applicationBuilder.UseSwagger();
        applicationBuilder.UseSwaggerUI();
      }
      else
      {
      }
      applicationBuilder.UseMiddleware<ErrorHandler>();

      applicationBuilder.UseStaticFiles();
      applicationBuilder.UseRouting();

      applicationBuilder.UseCors("cors_policy");

      applicationBuilder.UseHttpsRedirection();

      applicationBuilder.UseAuthentication();
      applicationBuilder.UseAuthorization();
    }
  }
}