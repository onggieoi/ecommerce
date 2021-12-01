using backend.Contracts;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class ReportController : BaseApiController<ReportController>
{
  private IReportService _reportService;

  public ReportController(IReportService reportService)
  {
    _reportService = reportService;
  }

  [HttpGet]
  public async Task<FileContentResult> Export([FromQuery] ReportQuery query)
  {
    var file = await _reportService.GetOrderExcelAsync(query);

    return new FileContentResult(file, "application/octet-stream")
    {
      FileDownloadName = $"report_{DateTime.UtcNow.ToString("yyyyMMdd")}.xlsx"
    };
  }
}
