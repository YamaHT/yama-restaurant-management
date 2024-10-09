using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using WebAPI.Models;
using WebAPI.Models.Enums;

namespace WebAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }

        public DbSet<Booking> Booking { get; set; }
        public DbSet<BookingDetail> BookingDetail { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<FeedbackProduct> FeedbackProduct { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Profile> Profile { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Table> Table { get; set; }
        public DbSet<TableType> TableType { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserVoucher> UserVoucher { get; set; }
        public DbSet<Voucher> Voucher { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost,1433;Initial Catalog=SWP391_SE1802_Group6;Integrated Security=True;Trust Server Certificate=True");
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
                .HasForeignKey(b => b.WaiterId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Category>().HasData(
                Enum.GetValues(typeof(CategoryEnum))
                    .Cast<CategoryEnum>()
                    .Select(categoryEnum => new Category
                    {
                        Id = (int)categoryEnum,
                        Name = categoryEnum.ToString()
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
