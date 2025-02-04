using System.Collections.Generic;
using System.Threading.Tasks;

public interface IBreakdownService
{
    Task<IEnumerable<Breakdown>> GetAllBreakdownsAsync();
    Task<Breakdown> GetBreakdownByIdAsync(int id);
    Task AddBreakdownAsync(Breakdown breakdown);
    Task UpdateBreakdownAsync(Breakdown breakdown);
    Task DeleteBreakdownAsync(int id);
}
