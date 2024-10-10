using System.ComponentModel.DataAnnotations;
using WebAPI.Utils.Exceptions;

namespace WebAPI.Utils
{
    public static class ObjectValidation
    {
        public static void TryValidate(this object obj)
        {
            var validationContext = new ValidationContext(obj);
            var validationResults = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(obj, validationContext, validationResults, true);

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
