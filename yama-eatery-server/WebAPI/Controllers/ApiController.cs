using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public abstract class ApiController : ControllerBase { }
}
