using backend.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Helpers;

public static class Pagination
{
  public static async Task<Paging<TModel>> PaginateAsync<TModel>(
      this IQueryable<TModel> query,
      int page,
      int limit,
      CancellationToken cancellationToken = default)
      where TModel : class
  {

    var paged = new Paging<TModel>();

    page = (page < 0) ? 1 : page;

    paged.CurrentPage = page;
    paged.PageSize = limit;

    // var totalItemsCountTask = await query.CountAsync(cancellationToken);

    var startRow = (page - 1) * limit;

    paged.Items = await query
                .Skip(startRow)
                .Take(limit)
                .ToListAsync(cancellationToken);

    paged.TotalItems = await query.CountAsync(cancellationToken);
    paged.TotalPages = (int)Math.Ceiling(paged.TotalItems / (double)limit);

    return paged;
  }
}