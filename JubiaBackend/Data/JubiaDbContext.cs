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
    }
}
