using Application.ViewModels.UserViewModels;
using Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Mappers
{
	public class MappersConfigurationsProfile : AutoMapper.Profile
	{
		public MappersConfigurationsProfile() {
			CreateMap<UserLoginDTO, User>().AfterMap(ValidateDestination);
		}

        #region ValidateDestination Function
        private static void ValidateDestination<TSource, TDestination>(TSource source, TDestination destination)
        {
            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(destination);

            if (!Validator.TryValidateObject(destination, context, validationResults, true))
            {
                var errors = string.Join("\n", validationResults.Select(vr => vr.ErrorMessage));
                throw new ValidationException(errors);
            }
        }
        #endregion
    }
}
