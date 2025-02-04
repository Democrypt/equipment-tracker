using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api/breakdowns")]
[ApiController]
public class BreakdownController : ControllerBase
{
    private readonly IBreakdownService _breakdownService;

    public BreakdownController(IBreakdownService breakdownService)
    {
        _breakdownService = breakdownService;
    }

    /// <summary>
    /// Get all breakdowns
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Breakdown>>> GetAll()
    {
        try
        {
            var breakdowns = await _breakdownService.GetAllBreakdownsAsync();
            return Ok(breakdowns);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }

    /// <summary>
    /// Get a single breakdown by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Breakdown>> GetById(int id)
    {
        try
        {
            var breakdown = await _breakdownService.GetBreakdownByIdAsync(id);
            if (breakdown == null)
                return NotFound(new { message = "Breakdown not found" });

            return Ok(breakdown);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }

    /// <summary>
    /// Create a new breakdown
    /// </summary>
    [HttpPost]
    public async Task<ActionResult> CreateBreakdown([FromBody] Breakdown breakdown)
    {
        try
        {
            if (breakdown == null)
                return BadRequest(new { message = "Invalid breakdown data" });

            if (!ModelState.IsValid)  // Check validation
                return BadRequest(ModelState);

            await _breakdownService.AddBreakdownAsync(breakdown);
            return CreatedAtAction(nameof(GetById), new { id = breakdown.Id }, breakdown);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }

    /// <summary>
    /// Update a breakdown
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBreakdown(int id, [FromBody] Breakdown breakdown)
    {
        try
        {
            if (id != breakdown.Id)
                return BadRequest(new { message = "ID mismatch" });

            var existingBreakdown = await _breakdownService.GetBreakdownByIdAsync(id);
            if (existingBreakdown == null)
                return NotFound(new { message = "Breakdown not found" });

            await _breakdownService.UpdateBreakdownAsync(breakdown);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }

    /// <summary>
    /// Delete a breakdown
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBreakdown(int id)
    {
        try
        {
            var existingBreakdown = await _breakdownService.GetBreakdownByIdAsync(id);
            if (existingBreakdown == null)
                return NotFound(new { message = "Breakdown not found" });

            await _breakdownService.DeleteBreakdownAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
        }
    }
}
