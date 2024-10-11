using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using WebAPI.Models;
using WebAPI.Models.Enums;

namespace WebAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }

        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Booking> Booking { get; set; }
        public DbSet<BookingDetail> BookingDetail { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<FeedbackProduct> FeedbackProduct { get; set; }
        public DbSet<Membership> Membership { get; set; }
        public DbSet<Position> Position { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Salary> Salary { get; set; }
        public DbSet<SubCategory> SubCategory { get; set; }
        public DbSet<Table> Table { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserVoucher> UserVoucher { get; set; }
        public DbSet<Voucher> Voucher { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost,1433;Initial Catalog=SWP391_SE1802_Group6;Integrated Security=True;Trust Server Certificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                Enum.GetValues(typeof(CategoryEnum))
                    .Cast<CategoryEnum>()
                    .Select(categoryEnum => new Category
                    {
                        Id = (int)categoryEnum,
                        Name = categoryEnum.ToString()
                    })
            );

            modelBuilder.Entity<Position>().HasData(
                Enum.GetValues(typeof(PositionEnum))
                    .Cast<PositionEnum>()
                    .Select(positionEnum => new Position
                    {
                        Id = int.TryParse(positionEnum.GetDisplayName(), null, out var id) ? id : 0,
                        Name = positionEnum.ToString(),
                        BaseSalary = (int)positionEnum
                    })
            );
        }
    }
}
