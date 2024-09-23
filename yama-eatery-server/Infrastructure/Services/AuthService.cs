using Application.Exceptions;
using Application.ViewModels.UserViewModels;
using Application;
using AutoMapper;
using Application.Utils;
using Domain.Enums;
using Domain.Models;
using Microsoft.Extensions.Configuration;
using Application.Services;

namespace Infrastructure.Services
{
    public class AuthService(IUnitOfWork _unitOfWork, IMapper _mapper, IConfiguration _configuration) : IAuthService
    {
        public async Task Register(UserLoginDTO userLoginDTO)
        {
            if (await _unitOfWork.UserRepository.CheckEmailExisted(userLoginDTO.Email))
            {
                throw new DataConflictException("Email existed");
            }

            var user = _mapper.Map<User>(userLoginDTO);
            user.Password = CryptoUtils.EncryptPassword(user.Password);
            user.Role = await _unitOfWork.RoleRepository.GetByIdAsync((int)RoleEnum.Customer);

            await _unitOfWork.UserRepository.AddAsync(user);
            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<string?> Login(UserLoginDTO userLoginDTO)
        {
            _mapper.Map<User>(userLoginDTO); // To validate the userLoginDTO contains null value or not

            var user = await _unitOfWork.UserRepository.GetUserByEmailAndPassword(userLoginDTO.Email, userLoginDTO.Password);
            return user?.GenerateJWT(_configuration["JWT:SecretKey"]);
        }
    }
}
