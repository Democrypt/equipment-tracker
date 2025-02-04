using System.Threading.Tasks;

public interface IReportService
{
    Task<byte[]> GeneratePdfReportAsync();
    Task<byte[]> GenerateExcelReportAsync();
}
