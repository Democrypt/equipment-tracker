using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api/reports")]
[ApiController]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("pdf")]
    public async Task<IActionResult> GetPdfReport()
    {
        var fileContents = await _reportService.GeneratePdfReportAsync();
        return File(fileContents, "application/pdf", "BreakdownReport.pdf");
    }

    [HttpGet("excel")]
    public async Task<IActionResult> GetExcelReport()
    {
        var fileContents = await _reportService.GenerateExcelReportAsync();
        return File(fileContents, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "BreakdownReport.xlsx");
    }
}
