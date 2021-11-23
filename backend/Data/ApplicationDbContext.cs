using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
  public DbSet<Product> Products { get; set; }
  public DbSet<Category> Categories { get; set; }
  public DbSet<Gallery> Gallery { get; set; }
  public DbSet<Address> Addresses { get; set; }
  public DbSet<Card> Cards { get; set; }
  public DbSet<Contact> Contacts { get; set; }
  public DbSet<Order> Orders { get; set; }
  public DbSet<OrderDetail> OrderDetails { get; set; }
  public DbSet<Coupon> Coupons { get; set; }

  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {

  }

  public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default(CancellationToken))
  {
    var modifiedEntries = ChangeTracker.Entries()
            .Where(x => x.Entity is BaseModel && (x.State == EntityState.Added || x.State == EntityState.Modified));

    foreach (var entry in modifiedEntries)
    {
      var entity = entry.Entity as BaseModel;

      if (entry.State == EntityState.Added)
      {
        entity.CreateAt = DateTime.UtcNow;
      }

      entity.UpdateAt = DateTime.UtcNow;
    }

    return (await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken));
  }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<User>(entity =>
    {
      entity.ToTable(name: "Users");
    });

    builder.Entity<IdentityRole<Guid>>(entity =>
    {
      entity.ToTable(name: "Roles");
    });

    builder.Entity<IdentityUserRole<Guid>>(entity =>
    {
      entity.ToTable("UserRoles");
    });

    builder.Entity<IdentityUserClaim<Guid>>(entity =>
    {
      entity.ToTable("UserClaims");
    });

    builder.Entity<IdentityUserLogin<Guid>>(entity =>
    {
      entity.ToTable("UserLogins");
    });

    builder.Entity<IdentityRoleClaim<Guid>>(entity =>
    {
      entity.ToTable("RoleClaims");
    });

    builder.Entity<IdentityUserToken<Guid>>(entity =>
    {
      entity.ToTable("UserTokens");
    });
  }
}