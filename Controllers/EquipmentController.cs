using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EquipmentController : ControllerBase
{
    private readonly IEquipmentService _service;

    public EquipmentController(IEquipmentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<Equipment>> GetAll()
    {
        return await _service.GetAllEquipment();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var equipment = await _service.GetEquipmentById(id);
        if (equipment == null) return NotFound();
        return Ok(equipment);
    }

    [Authorize(Roles = "Administrator, Engineer")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Equipment equipment)
    {
        await _service.AddEquipment(equipment);
        return Ok(new { message = "Equipment added successfully" });
    }

    [Authorize(Roles = "Administrator, Engineer")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Equipment equipment)
    {
        var existingEquipment = await _service.GetEquipmentById(id);
        if (existingEquipment == null) return NotFound();

        existingEquipment.Name = equipment.Name;
        existingEquipment.Type = equipment.Type;
        existingEquipment.SerialNumber = equipment.SerialNumber;
        existingEquipment.InstallationDate = equipment.InstallationDate;
        existingEquipment.Status = equipment.Status;
        existingEquipment.LastMaintenance = equipment.LastMaintenance;
        existingEquipment.NextMaintenance = equipment.NextMaintenance;
        existingEquipment.Technician = equipment.Technician;

        await _service.UpdateEquipment(existingEquipment);
        return Ok(new { message = "Equipment updated successfully" });
    }

    [Authorize(Roles = "Administrator")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existingEquipment = await _service.GetEquipmentById(id);
        if (existingEquipment == null) return NotFound();

        await _service.DeleteEquipment(id);
        return Ok(new { message = "Equipment deleted successfully" });
    }
}
