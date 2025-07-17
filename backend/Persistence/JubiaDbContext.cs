using Microsoft.EntityFrameworkCore;
using Jubia.API.Models; 

namespace Jubia.API.Persistence
{
    public class JubiaDbContext : DbContext
    {
        public JubiaDbContext(DbContextOptions<JubiaDbContext> options)
            : base(options)
        {
        }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; } 

        public DbSet<User> Users { get; set; }

    }
}










