﻿using Microsoft.AspNetCore.Authorization;
using WebAPI.Models.Enums;
using WebAPI.Utils;

namespace WebAPI.Controllers
{
    [Authorize(Roles = nameof(RoleEnum.Manager))]
    public class ProductManagementController(IUnitOfWork _unitOfWork) : ApiController
    {
    }
}