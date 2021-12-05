using backend.Contracts;

namespace backend.Services;

public interface IOrderService
{
  Task<OrderResponse> CreateOrderAsync(OrderRequest request);

  Task<OrderResponse> GetOrderDetailAsync(Guid id);
  Task<IEnumerable<OrderResponse>> GetOrdersAsync();

}