using Microsoft.EntityFrameworkCore;
using JubiaBackend.Models;

namespace JubiaBackend.Data
{
    public class JubiaDbContext : DbContext
    {
        public JubiaDbContext(DbContextOptions<JubiaDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<MediaSetting> MediaSettings { get; set; }

        public DbSet<Catalogue> Catalogues { get; set; }
        public DbSet<Kind> Kinds { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Weight> Weights { get; set; }
        public DbSet<Surface> Surfaces { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Shape> Shapes { get; set; }
        public DbSet<Thickness> Thicknesses { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<TradingUnit> TradingUnits { get; set; }
        public DbSet<PackageUnit> PackageUnits { get; set; }

        public DbSet<ServiceCatalogue> ServiceCatalogues { get; set; }
        public DbSet<ServiceKind> ServiceKinds { get; set; }
        public DbSet<ServiceSize> ServiceSizes { get; set; }
        public DbSet<ServiceAttribute> ServiceAttributes { get; set; }
        public DbSet<ServiceAttributeDetail> ServiceAttributeDetails { get; set; }
    }
}