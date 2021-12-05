export type DashboardReport = {
  revenueMonths: RevenueMonth[],
  revenue: ReportStatus,
  order: ReportStatus,
  customer: ReportStatus,
};

export type RevenueMonth = {
  month: string,
  revenue: number;
};

export type ReportStatus = {
  status: string,
  total: number;
}
