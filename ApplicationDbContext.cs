using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Equipment> Equipments { get; set; }
    public DbSet<Breakdown> Breakdowns { get; set; }
    public DbSet<MaintenanceRecord> MaintenanceRecords { get; set; }
}