using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class BreakdownRepository : IBreakdownRepository
{
    private readonly ApplicationDbContext _context;

    public BreakdownRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Breakdown>> GetAllAsync()
    {
        return await _context.Breakdowns.ToListAsync();
    }

    public async Task<Breakdown> GetByIdAsync(int id)
    {
        return await _context.Breakdowns.FindAsync(id);
    }

    public async Task<IEnumerable<Breakdown>> GetByStatusAsync(string status)
    {
        return await _context.Breakdowns.Where(b => b.Status == status).ToListAsync();
    }

    public async Task<IEnumerable<Breakdown>> GetByEquipmentIdAsync(int equipmentId)
    {
        return await _context.Breakdowns.Where(b => b.EquipmentId == equipmentId).ToListAsync();
    }

    public async Task AddAsync(Breakdown breakdown)
    {
        await _context.Breakdowns.AddAsync(breakdown);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Breakdown breakdown)
    {
        _context.Breakdowns.Update(breakdown);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var breakdown = await _context.Breakdowns.FindAsync(id);
        if (breakdown != null)
        {
            _context.Breakdowns.Remove(breakdown);
            await _context.SaveChangesAsync();
        }
    }
}
