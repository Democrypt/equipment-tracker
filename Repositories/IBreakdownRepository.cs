using System.Collections.Generic;
using System.Threading.Tasks;

public interface IBreakdownRepository
{
    Task<IEnumerable<Breakdown>> GetAllAsync();
    Task<Breakdown> GetByIdAsync(int id);
    Task AddAsync(Breakdown breakdown);
    Task UpdateAsync(Breakdown breakdown);
    Task DeleteAsync(int id);
}
