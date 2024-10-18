using static System.Net.Mime.MediaTypeNames;

namespace WebAPI.Utils
{
    public static class ImageUtil
    {
        public static async Task<string?> SaveImageAsync(string entity, string? oldImageName, IFormFile? file)
        {
            if (file == null || file.Length == 0)
            {
                return oldImageName;
            }

            var directoryPath = Path.Combine("..", "..", "yama-eatery-client", "src", "assets", "img", entity.ToLower());
            var newFilePath = Path.Combine(directoryPath, file.FileName);

            if (!Directory.Exists(directoryPath))
            {
                return oldImageName;
            }

            if (!string.IsNullOrEmpty(oldImageName))
            {
                var oldFilePath = Path.Combine(directoryPath, oldImageName);
                if (File.Exists(oldFilePath))
                {
                    File.Delete(oldFilePath);
                }
            }

            using (var stream = new FileStream(newFilePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return file.FileName;
        }
    }
}
