using System.ComponentModel.DataAnnotations;

public class Equipment
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string SerialNumber { get; set; }
    public DateTime InstallationDate { get; set; }
    public string Status { get; set; }
    public DateTime LastMaintenance { get; set; }
    public DateTime NextMaintenance { get; set; }
    public string Technician { get; set; }
}