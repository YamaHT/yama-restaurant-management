using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace WebAPI.Utils
{
    public static class StringUtil
    {
        public static string GenerateRandomPassword()
        {
            const string upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string lowerCase = "abcdefghijklmnopqrstuvwxyz";
            const string digits = "0123456789";
            const string specialCharacters = "@#$%^&";

            Random random = new();

            char[] passwordChars = new char[16];
            passwordChars[0] = upperCase[random.Next(upperCase.Length)];
            passwordChars[1] = lowerCase[random.Next(lowerCase.Length)];
            passwordChars[2] = digits[random.Next(digits.Length)];
            passwordChars[3] = specialCharacters[random.Next(specialCharacters.Length)];

            string allCharacters = upperCase + lowerCase + digits + specialCharacters;
            for (int i = 4; i < 16; i++)
            {
                passwordChars[i] = allCharacters[random.Next(allCharacters.Length)];
            }

            return new string(passwordChars.OrderBy(c => random.Next()).ToArray());
        }

        public static string GetEnumDisplayName(this Enum enumValue)
        {
            return enumValue.GetType()
                         .GetMember(enumValue.ToString())
                         .First()
                         .GetCustomAttribute<DisplayAttribute>()?
                         .GetName() ?? enumValue.ToString();
        }
    }
}
