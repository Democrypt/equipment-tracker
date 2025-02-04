using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    /// <summary>
    /// Registers a new user and assigns a role.
    /// </summary>
    public async Task<string> RegisterUser(RegisterModel model)
    {
        try
        {
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Role))
            {
                return "Invalid input data";
            }

            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
            {
                return "User already exists";
            }

            // Ensure the role exists before assigning it
            if (!await _roleManager.RoleExistsAsync(model.Role))
            {
                return $"Role '{model.Role}' does not exist.";
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return "User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description));
            }

            await _userManager.AddToRoleAsync(user, model.Role);
            return "User registered successfully";
        }
        catch (Exception ex)
        {
            return "Internal Server Error: " + ex.Message;
        }
    }

    /// <summary>
    /// Logs in a user and generates a JWT token.
    /// </summary>
    public async Task<Dictionary<string, string>> LoginUser(LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return new Dictionary<string, string> { { "error", "Invalid credentials" } };
        }

        var userRoles = await _userManager.GetRolesAsync(user);
        var role = userRoles.FirstOrDefault() ?? "Observer"; // Default to Observer if no role assigned

        var authClaims = new[]
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.Now.AddMinutes(60),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        // Return token and role as a JSON-friendly object
        return new Dictionary<string, string>
        {
            { "token", tokenString },
            { "role", role }
        };
    }
}
