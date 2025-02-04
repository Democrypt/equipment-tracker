using System.Collections.Generic;
using System.Threading.Tasks;

public interface IEquipmentRepository
{
    Task<IEnumerable<Equipment>> GetAllEquipment();
    Task<Equipment> GetEquipmentById(int id);
    Task AddEquipment(Equipment equipment);
    Task UpdateEquipment(Equipment equipment);
    Task DeleteEquipment(int id);
}