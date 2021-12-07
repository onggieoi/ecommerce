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
  private IAuthenticatedUserService _userContext;

  public ReportService(ApplicationDbContext dbContext, IAuthenticatedUserService userContext)
  {
    _dbContext = dbContext;
    _userContext = userContext;
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

      ISheet sheet1 = workbook.CreateSheet("SNKR Export");

      sheet1.AddMergedRegion(new CellRangeAddress(0, 0, 0, 10));
      IRow titleRow = sheet1.CreateRow(0);
      titleRow.Height = 10 * 60;

      var titleCell = titleRow.CreateCell(0);
      var titleStyle = workbook.CreateCellStyle();

      IFont titlFont = workbook.CreateFont();
      titlFont.IsBold = true;
      titlFont.FontHeightInPoints = 20;

      titleStyle.SetFont(titlFont);
      titleStyle.VerticalAlignment = VerticalAlignment.Center;
      titleStyle.Alignment = HorizontalAlignment.Center;

      titleCell.SetCellValue($"Order Report SKNR");
      titleCell.CellStyle = titleStyle;

      IRow authorRow = sheet1.CreateRow(2);

      authorRow.CreateCell(1).SetCellValue("Created by");
      authorRow.CreateCell(3).SetCellValue(_userContext.UserName);

      IRow createAtRow = sheet1.CreateRow(3);

      createAtRow.CreateCell(1).SetCellValue("Create At (UTC)");
      createAtRow.CreateCell(3).SetCellValue(DateTime.UtcNow.ToString("dd/MM/yyyy"));

      IRow createdFromRow = sheet1.CreateRow(5);

      createdFromRow.CreateCell(1).SetCellValue("Created From");
      createdFromRow.CreateCell(3).SetCellValue(query.CreatedFrom.ToString("dd/MM/yyyy"));

      IRow createdToRow = sheet1.CreateRow(6);

      createdToRow.CreateCell(1).SetCellValue("Created To");
      createdToRow.CreateCell(3).SetCellValue(query.CreatedTo.ToString("dd/MM/yyyy"));

      var rowIndex = 8;

      IRow row = sheet1.CreateRow(rowIndex);

      var headerStyle = workbook.CreateCellStyle();
      headerStyle.FillBackgroundColor = IndexedColors.Grey25Percent.Index;
      headerStyle.FillPattern = FillPattern.SolidForeground;

      List<string> headers = new List<string> { "STT", "Total Price", "Coupon Code", "Discount", "User", "Address", "Card", "Contact", "Create At", };

      for (int i = 0; i < headers.Count(); i++)
      {
        var headerCell = row.CreateCell(i);
        headerCell.SetCellValue(headers[i]);
        headerCell.CellStyle = headerStyle;
      }

      for (int i = 0; i < reports.Count(); i++)
      {
        rowIndex++;
        IRow newVal = sheet1.CreateRow(rowIndex);

        newVal.CreateCell(0).SetCellValue(i + 1);
        newVal.CreateCell(1).SetCellValue(reports[i].TotalPrice);
        newVal.CreateCell(2).SetCellValue(reports[i].Coupon is not null ? reports[i].Coupon.Code : "");
        newVal.CreateCell(3).SetCellValue(reports[i].Coupon is not null ? reports[i].Coupon.Discount.ToString() : "");
        newVal.CreateCell(4).SetCellValue(reports[i]?.User.UserName);
        newVal.CreateCell(5).SetCellValue(reports[i]?.Address.Info);
        newVal.CreateCell(6).SetCellValue(reports[i]?.Card is null ? "Cash" : reports[i]?.Card.Name + " - " + reports[i]?.Card.CardType + ":" + "**** **** ****" + reports[i]?.Card.LastFourDigit);
        newVal.CreateCell(7).SetCellValue(reports[i]?.Contact.Number);
        newVal.CreateCell(8).SetCellValue(reports[i].CreateAt.ToString("dd/MM/yyyy"));

        sheet1.AutoSizeColumn(i + 1);
        GC.Collect();
      }

      sheet1.SetColumnWidth(5, 9000);
      sheet1.SetColumnWidth(6, 7000);
      sheet1.SetColumnWidth(7, 4000);

      byte[] data = File.ReadAllBytes("images/snkr.png");
      int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
      ICreationHelper helper = workbook.GetCreationHelper();
      IDrawing drawing = sheet1.CreateDrawingPatriarch();
      IClientAnchor anchor = helper.CreateClientAnchor();
      anchor.Col1 = 6;
      anchor.Row1 = 2;
      IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
      picture.Resize();

      workbook.Write(fs);

      return fs.ToArray();
    }
  }
}