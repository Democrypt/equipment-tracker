using System.Collections.Generic;
using System.Threading.Tasks;

public class EquipmentService : IEquipmentService
{
    private readonly IEquipmentRepository _repository;

    public EquipmentService(IEquipmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Equipment>> GetAllEquipment()
    {
        return await _repository.GetAllEquipment();
    }

    public async Task<Equipment> GetEquipmentById(int id)
    {
        return await _repository.GetEquipmentById(id);
    }

    public async Task AddEquipment(Equipment equipment)
    {
        await _repository.AddEquipment(equipment);
    }

    public async Task UpdateEquipment(Equipment equipment)
    {
        await _repository.UpdateEquipment(equipment);
    }

    public async Task DeleteEquipment(int id)
    {
        await _repository.DeleteEquipment(id);
    }
}
