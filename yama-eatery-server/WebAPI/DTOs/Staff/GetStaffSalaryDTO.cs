namespace WebAPI.DTOs.Staff
{
    public class GetStaffSalaryDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double WorkHours { get; set; }
        public int NumberOfFaults { get; set; }
        public double NetSalary { get; set; } = 0;
        public DateOnly? PayDay { get; set; } 
    }
}
