using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    public class FeedbackController(IUnitOfWork _unitOfWork) : ApiController
    {
    }
}
