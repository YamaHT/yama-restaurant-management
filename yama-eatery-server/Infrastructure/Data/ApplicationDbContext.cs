using Application.Utils;
using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }

        public DbSet<Booking> Booking { get; set; }
        public DbSet<BookingDetail> BookingDetail { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Delivery> Delivery { get; set; }
        public DbSet<FeedbackProduct> FeedbackProduct { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Profile> Profile { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Shipping> Shipping { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Table> Table { get; set; }
        public DbSet<TableType> TableType { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserVoucher> UserVoucher { get; set; }
        public DbSet<Voucher> Voucher { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost,1433;Initial Catalog=SWP391_SE1802_Group6;Integrated Security=True;TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.BookingsUser)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Waiter)
                .WithMany(w => w.BookingsWaiter)
                .HasForeignKey(b => b.WaiterId);


            modelBuilder.Entity<Category>().HasData(
                Enum.GetValues(typeof(CategoryEnum))
                    .Cast<CategoryEnum>()
                    .Select(categoryEnum => new Category
                    {
                        Id = (int)categoryEnum,
                        Name = categoryEnum.ToString()
                    })
            );

            modelBuilder.Entity<Delivery>().HasData(
                Enum.GetValues(typeof(DeliveryEnum))
                    .Cast<DeliveryEnum>()
                    .Select(deliveryEnum => new Delivery
                    {
                        Id = (int)deliveryEnum,
                        Name = deliveryEnum.ToString(),
                        Price = deliveryEnum switch
                        {
                            DeliveryEnum.Free => 0,
                            DeliveryEnum.Save => 1,
                            DeliveryEnum.Standard => 2,
                            DeliveryEnum.Fast => 3,
                            _ => 0
                        }
                    })
            );

            modelBuilder.Entity<Role>().HasData(
                Enum.GetValues(typeof(RoleEnum))
                    .Cast<RoleEnum>()
                    .Select(roleEnum => new Role
                    {
                        Id = (int)roleEnum,
                        Name = roleEnum.ToString()
                    })
            );

            modelBuilder.Entity<Status>().HasData(
                Enum.GetValues(typeof(StatusEnum))
                    .Cast<StatusEnum>()
                    .Select(statusEnum => new Status
                    {
                        Id = (int)statusEnum,
                        Name = statusEnum.GetDisplayName()
                    })
            );

            modelBuilder.Entity<TableType>().HasData(
                Enum.GetValues(typeof(TableTypeEnum))
                    .Cast<TableTypeEnum>()
                    .Select(tableTypeEnum => new TableType
                    {
                        Id = (int)tableTypeEnum,
                        Name = tableTypeEnum.ToString()
                    })
            );

        }
    }
}
