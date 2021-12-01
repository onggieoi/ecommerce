using System.Net.Mime;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace backend.Services;

public class BlobService : IBlobService
{
  private readonly BlobServiceClient _blobServiceClient;

  public BlobService(BlobServiceClient blobServiceClient)
  {
    _blobServiceClient = blobServiceClient;
  }

  public async Task<string> UploadImageAsync(IFormFile file, string fileName)
  {
    var containerClient = _blobServiceClient.GetBlobContainerClient("snkr");

    var blobClient = containerClient.GetBlobClient($"{fileName}-{Guid.NewGuid()}");
    await blobClient.UploadAsync(file.OpenReadStream(), new BlobHttpHeaders { ContentType = file.ContentType });

    return blobClient.Uri.AbsoluteUri;
  }

  public async Task<string> UploadFileAsync(byte[] bytes, string fileName)
  {
    var containerClient = _blobServiceClient.GetBlobContainerClient("snkr");

    var blobClient = containerClient.GetBlobClient($"{fileName}-{Guid.NewGuid()}");

    using (var stream = new MemoryStream(bytes, writable: false))
    {
      await blobClient.UploadAsync(stream);
    }

    return blobClient.Uri.AbsoluteUri;
  }

  private BlobContainerClient GetContainerClient(string blobContainerName)
  {
    var containerClient = _blobServiceClient.GetBlobContainerClient(blobContainerName);
    containerClient.CreateIfNotExists(PublicAccessType.Blob);
    return containerClient;
  }
}