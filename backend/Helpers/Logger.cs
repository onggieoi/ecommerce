namespace backend.Helpers;

public static class Logger
{
  public static void LogInfo<T>(this ILogger<T> logger, string info)
  {
    logger.LogInformation($"{typeof(T)}: {info}");
  }
}