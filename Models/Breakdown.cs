using System;
using System.ComponentModel.DataAnnotations;

public class Breakdown
{
    public int Id { get; set; }

    [Required]
    public int EquipmentId { get; set; }

    [Required, MaxLength(255)]
    public string Description { get; set; }

    [Required]
    public DateTime ReportedAt { get; set; }

    [Required, MaxLength(100)]
    public string Technician { get; set; }

    [Required, MaxLength(50)]
    public string Status { get; set; }
}
