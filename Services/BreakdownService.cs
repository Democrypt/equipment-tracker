using System.Collections.Generic;
using System.Threading.Tasks;

public class BreakdownService : IBreakdownService
{
    private readonly IBreakdownRepository _repository;

    public BreakdownService(IBreakdownRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Breakdown>> GetAllBreakdownsAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Breakdown> GetBreakdownByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task AddBreakdownAsync(Breakdown breakdown)
    {
        await _repository.AddAsync(breakdown);
    }

    public async Task UpdateBreakdownAsync(Breakdown breakdown)
    {
        await _repository.UpdateAsync(breakdown);
    }

    public async Task DeleteBreakdownAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}
