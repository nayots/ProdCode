using Microsoft.EntityFrameworkCore;
using ProdCodeApi.Data.Models;

namespace ProdCodeApi.Data
{
    public class ProdCodeDbContext : DbContext
    {
        public ProdCodeDbContext(DbContextOptions<ProdCodeDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().Property(u => u.Id).UseSqlServerIdentityColumn();
            modelBuilder.Entity<User>().Property(u => u.Name).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
        }
    }
}