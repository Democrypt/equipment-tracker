using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Authorize]
[Route("api/maintenance")]
[ApiController]
public class MaintenanceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MaintenanceController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get all maintenance records
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllMaintenance()
    {
        var maintenanceRecords = await _context.MaintenanceRecords
            .Include(m => m.Equipment)
            .Select(m => new
            {
                m.Id,
                m.EquipmentId,
                EquipmentName = m.Equipment.Name,
                m.TypeOfWork,
                m.Description,
                m.DateOfCompletion,
                m.Technician
            })
            .ToListAsync();

        return Ok(maintenanceRecords);
    }

    /// <summary>
    /// Get a single maintenance record by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMaintenanceById(int id)
    {
        var maintenance = await _context.MaintenanceRecords
            .Include(m => m.Equipment)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (maintenance == null)
            return NotFound(new { error = "Maintenance record not found." });

        return Ok(maintenance);
    }

    /// <summary>
    /// Add a new maintenance record
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AddMaintenance([FromBody] MaintenanceRecord record)
    {
        if (record == null)
            return BadRequest(new { error = "Invalid maintenance data." });

        var equipmentExists = await _context.Equipments.AnyAsync(e => e.Id == record.EquipmentId);
        if (!equipmentExists)
            return BadRequest(new { error = "Invalid Equipment ID." });

        try
        {
            _context.MaintenanceRecords.Add(record);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMaintenanceById), new { id = record.Id }, record);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "An internal server error occurred.", details = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing maintenance record
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMaintenance(int id, [FromBody] MaintenanceRecord record)
    {
        if (id != record.Id)
            return BadRequest(new { error = "ID mismatch." });

        var existingRecord = await _context.MaintenanceRecords.FindAsync(id);
        if (existingRecord == null)
            return NotFound(new { error = "Maintenance record not found." });

        try
        {
            _context.Entry(existingRecord).CurrentValues.SetValues(record);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "An internal server error occurred.", details = ex.Message });
        }
    }

    /// <summary>
    /// Delete a maintenance record
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMaintenance(int id)
    {
        var existingRecord = await _context.MaintenanceRecords.FindAsync(id);
        if (existingRecord == null)
            return NotFound(new { error = "Maintenance record not found." });

        try
        {
            _context.MaintenanceRecords.Remove(existingRecord);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "An internal server error occurred.", details = ex.Message });
        }
    }
}
