using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class MaintenanceRecord
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Equipment")]
    public int EquipmentId { get; set; }

    [Required]
    public string TypeOfWork { get; set; }  // Example: "Preventive Maintenance", "Repair", "Diagnostics"

    [Required]
    public string Description { get; set; }

    [Required]
    public DateTime DateOfCompletion { get; set; }

    [Required]
    public string Technician { get; set; }

    [JsonIgnore] 
    public virtual Equipment? Equipment { get; set; } 
}
