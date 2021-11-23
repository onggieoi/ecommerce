
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

      applicationBuilder.UseStaticFiles();
      applicationBuilder.UseRouting();

      applicationBuilder.UseCors("cors_policy");
      // builder =>
      // {
      //   builder.AllowAnyOrigin()
      //       .AllowAnyMethod()
      //       .AllowAnyHeader();
      // });

      applicationBuilder.UseHttpsRedirection();

      applicationBuilder.UseAuthentication();
      applicationBuilder.UseAuthorization();
    }
  }
}