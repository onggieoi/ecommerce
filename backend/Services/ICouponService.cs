using backend.Contracts;

namespace backend.Services;

public interface ICouponService
{
  Task<IEnumerable<CouponResponse>> GetCouponsAsync();
  Task<CouponResponse> UpsertCouponAsync(CouponRequest request);
  Task<bool> DeleteAsync(IEnumerable<Guid> ids);
  Task<CouponResponse> GetCouponAsync(string code);
}