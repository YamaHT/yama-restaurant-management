namespace WebAPI.Utils
{
    public static class CryptoUtils
    {
        public static string EncryptPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool IsPasswordCorrect(string password, string? passwordHashed)
        {
            return passwordHashed != null && BCrypt.Net.BCrypt.Verify(password, passwordHashed);
        }
    }
}
