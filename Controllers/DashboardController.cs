using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Authorize]
[Route("api/dashboard")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("status-counts")]
    public async Task<IActionResult> GetStatusCounts()
    {
        var data = await _dashboardService.GetEquipmentStatusCounts();
        return Ok(data);
    }

    [HttpGet("recent-maintenance")]
    public async Task<IActionResult> GetRecentMaintenance()
    {
        var data = await _dashboardService.GetRecentMaintenance();
        return Ok(data);
    }

    [HttpGet("upcoming-maintenance")]
    public async Task<IActionResult> GetUpcomingMaintenance()
    {
        var data = await _dashboardService.GetUpcomingMaintenance();
        return Ok(data);
    }

    [HttpGet("top-breakdowns")]
    public async Task<IActionResult> GetTopBreakdowns()
    {
        var data = await _dashboardService.GetTopBreakdowns();
        return Ok(data);
    }
}
