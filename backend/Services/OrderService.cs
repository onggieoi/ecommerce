using AutoMapper;
using backend.Contracts;
using backend.Data;
using backend.Exceptions;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class OrderService : IOrderService
{
  private ApplicationDbContext _dbContext;
  private IAuthenticatedUserService _authenticatedUserService;
  private IMapper _mapper;

  public OrderService(ApplicationDbContext dbContext,
    IAuthenticatedUserService authenticatedUserService,
    IMapper mapper)
  {
    _dbContext = dbContext;
    _authenticatedUserService = authenticatedUserService;
    _mapper = mapper;
  }
  public async Task<OrderResponse> CreateOrderAsync(OrderRequest request)
  {
    var productIds = request.OrderDetails.Select(od => od.ProductId);
    var products = await _dbContext.Set<Product>()
                                .AsNoTracking()
                                .Where(p => productIds.Contains(p.Id))
                                .ToListAsync();

    var order = _mapper.Map<Order>(request);

    order.UserId = _authenticatedUserService.Id;

    var orderDetails = new List<OrderDetail>();
    double totalPrice = 0;

    products.ForEach(p =>
    {
      var orderdetailRq = request.OrderDetails.Single(od => od.ProductId.Equals(p.Id));

      orderDetails.Add(new OrderDetail
      {
        SalePrice = p.SalePrice,
        Quantity = orderdetailRq.Quantity,
        ProductId = orderdetailRq.ProductId,
      });

      totalPrice += p.SalePrice * orderdetailRq.Quantity;
    });

    order.TotalPrice = totalPrice;
    order.OrderDetails = orderDetails;

    await _dbContext.AddAsync(order);
    await _dbContext.SaveChangesAsync();

    return _mapper.Map<OrderResponse>(order);
  }

  public async Task<OrderResponse> GetOrderDetailAsync(Guid id)
  {
    var order = await _dbContext.Set<Order>()
                                          .Include(o => o.Address)
                                          .Include(o => o.Card)
                                          .Include(o => o.Contact)
                                          .Include(o => o.OrderDetails)
                                            .ThenInclude(od => od.Product)
                                          .Where(o => o.Id.Equals(id))
                                          .SingleOrDefaultAsync();

    if (order is null)
    {
      throw new NotFoundException("Order is not found");
    }

    if (_authenticatedUserService.Id != order.UserId)
    {
      throw new NotFoundException("Order is not found");
    }

    return _mapper.Map<OrderResponse>(order);
  }

  public async Task<IEnumerable<OrderResponse>> GetOrdersAsync()
  {
    var orders = await _dbContext.Set<Order>()
                                    .Include(o => o.Address)
                                    .Include(o => o.Card)
                                    .Include(o => o.Contact)
                                    .Include(o => o.OrderDetails)
                                      .ThenInclude(od => od.Product)
                                    .Include(o => o.User)
                                    .ToListAsync();

    return _mapper.Map<IEnumerable<OrderResponse>>(orders);
  }
}