using static System.Net.Mime.MediaTypeNames;

namespace WebAPI.Utils
{
    public static class ImageUtil
    {
        public static async Task<string?> AddImageAsync(string entity, IFormFile? file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            var newFileName = $"{Guid.NewGuid()}-{file.FileName}";
            var directoryPath = Path.Combine("..", "..", "yama-eatery-client", "src", "assets", "img", entity.ToLower());
            var newFilePath = Path.Combine(directoryPath, newFileName);

            if (!Directory.Exists(directoryPath))
            {
                return null;
            }

            using (var stream = new FileStream(newFilePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return newFileName;
        }

        public static async Task<string?> AddImageFromUrlAsync(string entity, string imageName, string? imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
            {
                return null;
            }
            var directoryPath = Path.Combine("..", "..", "yama-eatery-client", "src", "assets", "img", entity.ToLower());

            using var client = new HttpClient();
            byte[] imageBytes = await client.GetByteArrayAsync(imageUrl);

            string fileName = $"{Guid.NewGuid()}-{imageName}.jpg";
            var newFilePath = Path.Combine(directoryPath, fileName);

            await File.WriteAllBytesAsync(newFilePath, imageBytes);

            return fileName;
        }

        public static void DeleteImage(string entity, string? imageName)
        {
            var directoryPath = Path.Combine("..", "..", "yama-eatery-client", "src", "assets", "img", entity.ToLower());

            if (!string.IsNullOrEmpty(imageName))
            {
                var filePath = Path.Combine(directoryPath, imageName);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
        }

        public static async Task<string?> UpdateImageAsync(string entity, string? oldImageName, IFormFile? file)
        {
            if (file == null || file.Length == 0)
            {
                return oldImageName;
            }

            DeleteImage(entity, oldImageName);

            var newFileName = await AddImageAsync(entity, file);

            return newFileName;
        }
    }
}
