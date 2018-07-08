using Microsoft.EntityFrameworkCore;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Helpers;

namespace ProdCodeApi.Data
{
    public class ProdCodeDbContext : DbContext
    {
        public ProdCodeDbContext(DbContextOptions<ProdCodeDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().Property(u => u.Id).UseSqlServerIdentityColumn();
            modelBuilder.Entity<User>().Property(u => u.Name).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
            modelBuilder.Entity<User>()
                .HasMany(u => u.Roles)
                .WithOne(ur => ur.User)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<Role>().Property(r => r.Name).IsRequired();
            modelBuilder.Entity<Role>().HasIndex(r => r.Name).IsUnique();
            modelBuilder.Entity<Role>()
                .HasMany(r => r.Users)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<Role>().HasData(new Role() {Id = 1, Name = "User" });
            modelBuilder.Entity<Role>().HasData(new Role() {Id = 2, Name = "Admin" });
            modelBuilder.Entity<User>().HasData(new User() {Id = 1, Name = "Admin", Email = "admin@admin.com", PasswordHash = EncryptionHelper.Sha256_Hash("123") });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 1, RoleId = 1 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 1, RoleId = 2 });
        }
    }
}