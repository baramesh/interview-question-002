using Example.InterviewQuestion002.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Example.InterviewQuestion002.Api.Data;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("auth_q002");

        var user = modelBuilder.Entity<AppUser>();
        user.ToTable("users");
        user.HasKey(item => item.Id);
        user.Property(item => item.Id).HasColumnName("id");
        user.Property(item => item.Username).HasColumnName("username").HasMaxLength(50);
        user.Property(item => item.NormalizedUsername).HasColumnName("normalized_username").HasMaxLength(50);
        user.Property(item => item.PasswordHash).HasColumnName("password_hash");
        user.Property(item => item.CreatedAtUtc).HasColumnName("created_at_utc");
        user.HasIndex(item => item.NormalizedUsername).IsUnique();
    }
}
