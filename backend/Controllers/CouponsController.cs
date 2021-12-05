using backend.Constants;
using backend.Contracts;
using backend.Helpers;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class CouponsController : BaseApiController<CouponsController>
{
  private ICouponService _couponService;

  public CouponsController(ICouponService couponService)
  {
    _couponService = couponService;
  }

  [HttpPost]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult<string>> UpsertCoupon([FromBody] CouponRequest request)
  {
    var coupon = await _couponService.UpsertCouponAsync(request);

    return Ok(coupon);
  }

  [HttpGet]
  [Route("{code}")]
  public async Task<ActionResult<string>> GetCoupon([FromRoute] string code)
  {
    var coupon = await _couponService.GetCouponAsync(code);

    return Ok(coupon);
  }

  [HttpGet]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult<string>> GetCoupons()
  {
    var coupons = await _couponService.GetCouponsAsync();

    return Ok(coupons);
  }

  [HttpDelete]
  [Authorize(RolePolicy.Admin)]
  public async Task<ActionResult<string>> DeleteCoupon([FromBody] IEnumerable<Guid> ids)
  {
    var result = await _couponService.DeleteAsync(ids);

    return Ok(result);
  }
}
