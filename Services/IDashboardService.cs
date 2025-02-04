using System.Collections.Generic;
using System.Threading.Tasks;

public interface IDashboardService
{
    Task<Dictionary<string, int>> GetEquipmentStatusCounts();
    Task<List<MaintenanceRecord>> GetRecentMaintenance();
    Task<List<Equipment>> GetUpcomingMaintenance();
    Task<List<EquipmentBreakdown>> GetTopBreakdowns();
}