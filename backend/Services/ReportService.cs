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