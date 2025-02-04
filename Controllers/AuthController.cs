using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var result = await _authService.RegisterUser(model);
        if (result.Contains("failed") || result.Contains("Error") || result.Contains("exists"))
        {
            return BadRequest(new { message = result });
        }
        return Ok(new { message = result });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var loginResult = await _authService.LoginUser(model);

        if (loginResult.ContainsKey("error"))
        {
            return Unauthorized(new { message = loginResult["error"] });
        }

        return Ok(loginResult); // Returns a JSON object with "token" and "role"
    }
}
