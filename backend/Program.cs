using backend.ApplicationBuilders;
using backend.Middlewares;
using backend.ServiceConllection;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
    .MinimumLevel.Override("System", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
    .Enrich.FromLogContext()
    // uncomment to write to Azure diagnostics stream
    .WriteTo.File(
       @"D:\home\LogFiles\Application\identityserver.txt",
       fileSizeLimitBytes: 1_000_000,
       rollOnFileSizeLimit: true,
       shared: true,
       flushToDiskInterval: TimeSpan.FromSeconds(1))
    .WriteTo.Console(
        outputTemplate: "[{Timestamp} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}",
        theme: AnsiConsoleTheme.Code)
    .CreateLogger();

try
{
  Log.Information("Starting host...");

  var builder = WebApplication.CreateBuilder(args);
  var config = builder.Configuration;
  builder.Services.AddServices(config);

  var app = builder.Build();

  // Configure the HTTP request pipeline.
  app.UseMiddleware<ErrorHandler>();

  app.UseApplicationBuilder(app.Environment.IsDevelopment());

  app.MapControllers();

  await app.RunAsync();
}
catch (Exception ex)
{
  Log.Fatal(ex, "Host terminated unexpectedly.");
}