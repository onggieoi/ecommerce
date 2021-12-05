using System.Globalization;
using backend.Constants;
using backend.Contracts;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;

namespace backend.Services;

public class ReportService : IReportService
{
  private ApplicationDbContext _dbContext;

  public ReportService(ApplicationDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  public async Task<DashboardReport> GetReportDashboradAsync()
  {
    var today = DateTime.UtcNow;

    var orders = await _dbContext.Set<Order>().AsNoTracking()
                                  .Where(o => o.CreateAt.Month > today.AddMonths(-11).Month)
                                  .ToListAsync();

    var test = orders.Where(o => o.CreateAt.Month == 11).ToList();


    var revenueMonths = new List<RevenueMonth>();
    for (int i = today.Month - 11; i <= today.Month; i++)
    {
      var ordersInMonth = orders.Where(o => o.CreateAt.Month == i).ToList();

      revenueMonths.Add(new RevenueMonth
      {
        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i),
        Revenue = (int)ordersInMonth.Select(o => o.TotalPrice).Sum(),
      });
    }

    var revenueReport = new ReportStatus
    {
      Status = revenueMonths[11].Revenue > revenueMonths[10].Revenue ? "up" : "down",
      Total = revenueMonths[11].Revenue,
    };

    var totalOrdersInMonth = orders.Where(c => c.CreateAt.Month.Equals(today.Month)).Count();
    var ordersInPrevMonth = orders.Where(c => c.CreateAt.Month.Equals(today.Month - 1)).Count();

    var orderReport = new ReportStatus
    {
      Status = totalOrdersInMonth > ordersInPrevMonth ? "up" : "down",
      Total = totalOrdersInMonth,
    };

    var customers = await _dbContext.Set<User>().AsNoTracking()
                              .Where(u => u.Role.Equals(Roles.Customer)
                                        && u.CreateAt.Month < today.AddMonths(-1).Month)
                              .ToListAsync();

    var customersInMonth = customers.Where(c => c.CreateAt.Month.Equals(today.Month)).Count();
    var customersInPreMonth = customers.Where(c => c.CreateAt.Month.Equals(today.Month - 1)).Count();

    var customerReport = new ReportStatus
    {
      Status = customersInMonth > customersInPreMonth ? "up" : "down",
      Total = customersInMonth,
    };

    return new DashboardReport
    {
      RevenueMonths = revenueMonths,
      Revenue = revenueReport,
      Order = orderReport,
      Customer = customerReport,
    };
  }

  public async Task<byte[]> GetOrderExcelAsync(ReportQuery query)
  {
    var reports = await _dbContext.Set<Order>()
      .AsNoTracking()
      .Include(o => o.Coupon)
      .Include(o => o.User)
      .Include(o => o.Contact)
      .Include(o => o.Address)
      .Include(o => o.Card)
      .Where(o => query.CreatedFrom.ToUniversalTime() < o.CreateAt && query.CreatedTo.ToUniversalTime() > o.CreateAt)
      .ToListAsync();

    using (var fs = new MemoryStream())
    {
      IWorkbook workbook = new XSSFWorkbook();

      ISheet sheet1 = workbook.CreateSheet("Sheet1");

      sheet1.AddMergedRegion(new CellRangeAddress(0, 0, 0, 10));
      IRow titleRow = sheet1.CreateRow(0);
      titleRow.Height = 30 * 80;

      var titleCell = titleRow.CreateCell(0);
      var titleStyle = workbook.CreateCellStyle();

      IFont titlFont = workbook.CreateFont();
      titlFont.IsBold = true;
      titlFont.FontHeightInPoints = 20;
      titleStyle.SetFont(titlFont);

      titleCell.SetCellValue($"Order Report SKNR {query.CreatedFrom.ToString("yyyyMMdd")} - {query.CreatedTo.ToString("yyyyMMdd")}");
      titleCell.CellStyle = titleStyle;

      var rowIndex = 1;

      IRow row = sheet1.CreateRow(rowIndex);
      row.CreateCell(0).SetCellValue("STT");
      row.CreateCell(1).SetCellValue("Total Price");
      row.CreateCell(2).SetCellValue("Coupon Code");
      row.CreateCell(3).SetCellValue("Discount");
      row.CreateCell(4).SetCellValue("User");
      row.CreateCell(5).SetCellValue("Address");
      row.CreateCell(6).SetCellValue("Card");
      row.CreateCell(7).SetCellValue("Contact");
      row.CreateCell(8).SetCellValue("Create At");

      for (int i = 0; i < reports.Count(); i++)
      {
        rowIndex++;
        IRow newVal = sheet1.CreateRow(rowIndex);

        newVal.CreateCell(0).SetCellValue(i + 1);
        newVal.CreateCell(1).SetCellValue(reports[i].TotalPrice);
        newVal.CreateCell(2).SetCellValue(reports[i].Coupon is null ? reports[i].Coupon.Code : "");
        newVal.CreateCell(3).SetCellValue(reports[i].Coupon is null ? reports[i].Coupon.Discount.ToString() : "");
        newVal.CreateCell(4).SetCellValue(reports[i]?.User.UserName);
        newVal.CreateCell(5).SetCellValue(reports[i]?.Address.Info);
        newVal.CreateCell(6).SetCellValue(reports[i]?.Card.CardType);
        newVal.CreateCell(7).SetCellValue(reports[i]?.Contact.Number);
        newVal.CreateCell(8).SetCellValue(reports[i].CreateAt.ToString("yyyyMMdd"));

        sheet1.AutoSizeColumn(i + 1);
      }

      workbook.Write(fs);

      return fs.ToArray();
    }
  }
}