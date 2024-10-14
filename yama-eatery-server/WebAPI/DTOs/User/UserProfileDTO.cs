using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models;

namespace WebAPI.DTOs.User
{
    public class UserProfileDTO
    {
        public string? Image {  get; set; }
        public string? Name { get; set; }

        public DateOnly? Birthday { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }
    }

}
