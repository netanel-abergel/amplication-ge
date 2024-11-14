using Microsoft.EntityFrameworkCore;
using Service_1.Infrastructure.Models;

namespace Service_1.Infrastructure;

public class Service_1DbContext : DbContext
{
    public Service_1DbContext(DbContextOptions<Service_1DbContext> options)
        : base(options) { }

    public DbSet<CustomerDbModel> Customers { get; set; }

    public DbSet<OrderDbModel> Orders { get; set; }
}
