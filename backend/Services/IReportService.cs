using backend.Contracts;

namespace backend.Services;

public interface IReportService
{
  Task<byte[]> GetOrderExcelAsync(ReportQuery query);
}