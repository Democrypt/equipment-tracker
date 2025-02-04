using System.Collections.Generic;
using System.Threading.Tasks;

public interface IEquipmentService
{
    Task<IEnumerable<Equipment>> GetAllEquipment();
    Task<Equipment> GetEquipmentById(int id);
    Task AddEquipment(Equipment equipment);
    Task UpdateEquipment(Equipment equipment);
    Task DeleteEquipment(int id);
}