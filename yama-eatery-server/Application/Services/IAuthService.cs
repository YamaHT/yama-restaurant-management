using Application.ViewModels.UserViewModels;

namespace Application.Services
{
    public interface IAuthService
    {
        public Task Register(UserLoginDTO userLoginDTO);
        public Task<string?> Login(UserLoginDTO userLoginDTO);
    }
}
