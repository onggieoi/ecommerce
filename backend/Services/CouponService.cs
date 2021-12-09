using AutoMapper;
using backend.Contracts;
using backend.Data;
using backend.Exceptions;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CouponService : ICouponService
{
  private ApplicationDbContext _dbContext;
  private IAuthenticatedUserService _authenticatedUserService;
  private IMapper _mapper;

  public CouponService(ApplicationDbContext dbContext,
    IAuthenticatedUserService authenticatedUserService,
    IMapper mapper)
  {
    _dbContext = dbContext;
    _mapper = mapper;
  }

  public async Task<IEnumerable<CouponResponse>> GetCouponsAsync()
  {
    var coupons = await _dbContext.Set<Coupon>()
      .Include(c => c.Orders)
      .AsNoTracking()
      .Where(c => !c.IsDeleted && c.EndDate > DateTime.UtcNow)
      .ToListAsync();

    return _mapper.Map<IEnumerable<CouponResponse>>(coupons);
  }

  public async Task<CouponResponse> UpsertCouponAsync(CouponRequest request)
  {
    var duplicated = _dbContext.Set<Coupon>()
        .Where(c => c.Code.Equals(request.Code) && !c.IsDeleted)
        .AsQueryable();

    if (duplicated.Any())
    {
      throw new BadRequestException($"Coupon {request.Code} is Existing");
    }

    var coupon = _mapper.Map<Coupon>(request);

    if (coupon.Id.Equals(Guid.Empty))
    {
      await _dbContext.Set<Coupon>().AddAsync(coupon);
    }
    else
    {
      var couponUpdating = await _dbContext.Set<Coupon>()
        .FirstOrDefaultAsync(c => c.Id.Equals(coupon.Id)
                                && !c.IsDeleted);

      if (couponUpdating is null)
      {
        throw new NotFoundException($"Coupon {coupon.Code} is NotFound");
      }

      _dbContext.Entry<Coupon>(couponUpdating).CurrentValues.SetValues(coupon);
    }

    await _dbContext.SaveChangesAsync();

    return _mapper.Map<CouponResponse>(coupon);
  }

  public async Task<bool> DeleteAsync(IEnumerable<Guid> ids)
  {
    try
    {
      var deleteCoupons = await _dbContext.Set<Coupon>().Where(c => ids.Contains(c.Id)).ToListAsync();

      deleteCoupons.ForEach(c =>
      {
        c.IsDeleted = true;
      });

      await _dbContext.SaveChangesAsync();

      return true;
    }
    catch (System.Exception)
    {
      return false;
    }
  }

  public async Task<CouponResponse> GetCouponAsync(string code)
  {
    var coupon = await _dbContext.Set<Coupon>()
      .FirstOrDefaultAsync(c => c.Code.Equals(code)
                              && !c.IsDeleted
                              && c.EndDate > DateTime.UtcNow);

    if (coupon is null)
    {
      throw new NotFoundException($"Coupon {code} is NotFound");
    }

    return _mapper.Map<CouponResponse>(coupon);
  }
}