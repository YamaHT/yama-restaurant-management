namespace WebAPI.DTOs.Staff
{
    public class UpdateStaffAttendanceDTO
    {
        public int Id { get; set; }
        public string? CheckInTime { get; set; }
        public string? CheckOutTime { get; set; }
        public bool LateArrival { get; set; }
        public bool EarlyLeave { get; set; }
    }
}
