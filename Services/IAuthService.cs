using System.Threading.Tasks;

public interface IAuthService
{
    Task<string> RegisterUser(RegisterModel model);
    Task<Dictionary<string, string>> LoginUser(LoginModel model);
}