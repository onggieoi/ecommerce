namespace backend.Services;

public interface IBlobService
{
  Task<string> UploadImageAsync(IFormFile file, string fileName);
  Task<string> UploadFileAsync(byte[] bytes, string fileName);
}