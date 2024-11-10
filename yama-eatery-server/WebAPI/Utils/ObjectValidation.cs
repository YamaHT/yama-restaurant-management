using System.ComponentModel.DataAnnotations;
using WebAPI.Models;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Utils
{
    public static class ObjectValidation
    {
        public static void TryValidate(this object entity)
        {
            var validationContext = new ValidationContext(entity);
            var validationResults = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(entity, validationContext, validationResults, true);

            if (!isValid)
            {
                var errorMessages = validationResults
                    .Select(vr => vr.ErrorMessage)
                    .ToList();

                throw new ValidationException(string.Join("\n", errorMessages));
            }
        }
    }
}
