using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    public class BookingController(IUnitOfWork _unitOfWork) : ApiController
    {
    }
}
