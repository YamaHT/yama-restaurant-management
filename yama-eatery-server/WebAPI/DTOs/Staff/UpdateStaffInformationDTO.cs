namespace WebAPI.DTOs.Staff
{
    public class UpdateStaffInformationDTO
    {
        public int EmployeeId { get; set; }
        public IFormFile? ImageFile { get; set; } 
        public string? Name { get; set; }
        public DateOnly Birthday { get; set; }
        public string? Phone { get; set; }
        public string? Gender { get; set; }
    }
}
