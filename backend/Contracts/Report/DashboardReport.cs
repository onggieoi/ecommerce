namespace backend.Contracts;

public class DashboardReport
{
  public List<RevenueMonth> RevenueMonths { get; set; }
  public ReportStatus Revenue { get; set; }
  public ReportStatus Order { get; set; }
  public ReportStatus Customer { get; set; }
}

public class RevenueMonth
{
  public string Month { get; set; }
  public int Revenue { get; set; }
}

public class ReportStatus
{
  public string Status { get; set; }
  public int Total { get; set; }
}
