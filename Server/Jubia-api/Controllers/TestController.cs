using Microsoft.AspNetCore.Mvc;

namespace Jubia.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Jubia API is working!");
    }
}