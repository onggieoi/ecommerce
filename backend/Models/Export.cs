namespace backend.Models;

public class Export : BaseModel
{
  public Guid UserId { get; set; }
  public User User { get; set; }
  public string FileExportPath { get; set; }
  public DateTime PublishFrom { get; set; }
  public DateTime PublishTo { get; set; }
}