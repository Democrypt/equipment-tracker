using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class DashboardService : IDashboardService
{
    private readonly ApplicationDbContext _context;

    public DashboardService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Dictionary<string, int>> GetEquipmentStatusCounts()
    {
        return await _context.Equipments
            .GroupBy(e => e.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToDictionaryAsync(g => g.Status, g => g.Count);
    }

    public async Task<List<MaintenanceRecord>> GetRecentMaintenance()
    {
        return await _context.MaintenanceRecords
            .Where(m => m.DateOfCompletion >= DateTime.UtcNow.AddMonths(-6))
            .OrderByDescending(m => m.DateOfCompletion)
            .ToListAsync();
    }

    public async Task<List<Equipment>> GetUpcomingMaintenance()
    {
        return await _context.Equipments
            .Where(e => e.NextMaintenance >= DateTime.UtcNow)
            .OrderBy(e => e.NextMaintenance)
            .ToListAsync();
    }

    public async Task<List<EquipmentBreakdown>> GetTopBreakdowns()
    {
        return await _context.Breakdowns
            .GroupBy(b => b.EquipmentId)
            .Select(g => new EquipmentBreakdown
            {
                EquipmentId = g.Key,
                BreakdownCount = g.Count()
            })
            .OrderByDescending(b => b.BreakdownCount)
            .Take(5)
            .ToListAsync();
    }
}

public class EquipmentBreakdown
{
    public int EquipmentId { get; set; }
    public int BreakdownCount { get; set; }
}
