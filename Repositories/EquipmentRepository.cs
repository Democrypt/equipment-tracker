using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class EquipmentRepository : IEquipmentRepository
{
    private readonly ApplicationDbContext _context;

    public EquipmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Equipment>> GetAllEquipment()
    {
        return await _context.Equipments.ToListAsync();
    }

    public async Task<Equipment> GetEquipmentById(int id)
    {
        return await _context.Equipments.FindAsync(id);
    }

    public async Task AddEquipment(Equipment equipment)
    {
        await _context.Equipments.AddAsync(equipment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateEquipment(Equipment equipment)
    {
        _context.Equipments.Update(equipment);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteEquipment(int id)
    {
        var equipment = await _context.Equipments.FindAsync(id);
        if (equipment != null)
        {
            _context.Equipments.Remove(equipment);
            await _context.SaveChangesAsync();
        }
    }
}
