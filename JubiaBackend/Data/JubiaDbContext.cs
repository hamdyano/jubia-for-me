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
        public DbSet<Media_Catalogue> Media_Catalogue { get; set; }
        public DbSet<Media_Kind> Media_Kind { get; set; }
        public DbSet<Media_Size> Media_Size { get; set; }
        public DbSet<Media_Weight> Media_Weight { get; set; }
        public DbSet<Media_Surface> Media_Surface { get; set; }
        public DbSet<Media_Color> Media_Color { get; set; }
        public DbSet<Media_Shape> Media_Shape { get; set; }
        public DbSet<Media_Thickness> Media_Thickness { get; set; }
        public DbSet<Media_Brand> Media_Brand { get; set; }
        public DbSet<Media_TradingUnit> Media_TradingUnit { get; set; }
        public DbSet<Media_PackageUnit> Media_PackageUnit { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optionally, add further configuration here, such as default values or constraints.
            modelBuilder.Entity<Media_Size>(entity =>
            {
                entity.Property(e => e.Width).HasColumnType("float");
                entity.Property(e => e.Height).HasColumnType("float");
            });
        }
    }
}







/*  public DbSet<ServiceCatalogue> ServiceCatalogues { get; set; }
                      public DbSet<ServiceKind> ServiceKinds { get; set; }
                      public DbSet<ServiceSize> ServiceSizes { get; set; }
                      public DbSet<ServiceAttribute> ServiceAttributes { get; set; }
                      public DbSet<ServiceAttributeDetail> ServiceAttributeDetails { get; set; }*/