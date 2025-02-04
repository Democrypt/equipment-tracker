using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OfficeOpenXml;
using iTextSharp.text;
using iTextSharp.text.pdf;

public class ReportService : IReportService
{
    private readonly IBreakdownRepository _repository;

    public ReportService(IBreakdownRepository repository)
    {
        _repository = repository;
    }

    public async Task<byte[]> GeneratePdfReportAsync()
    {
        var breakdowns = await _repository.GetAllAsync();
        using (MemoryStream stream = new MemoryStream())
        {
            Document document = new Document();
            PdfWriter.GetInstance(document, stream);
            document.Open();

            document.Add(new Paragraph("Breakdown Report"));
            document.Add(new Paragraph("\n"));

            PdfPTable table = new PdfPTable(3);
            table.AddCell("ID");
            table.AddCell("Equipment ID");
            table.AddCell("Description");

            foreach (var breakdown in breakdowns)
            {
                table.AddCell(breakdown.Id.ToString());
                table.AddCell(breakdown.EquipmentId.ToString());
                table.AddCell(breakdown.Description);
            }

            document.Add(table);
            document.Close();
            return stream.ToArray();
        }
    }

    public async Task<byte[]> GenerateExcelReportAsync()
    {
        var breakdowns = await _repository.GetAllAsync();
        using (var package = new ExcelPackage())
        {
            var worksheet = package.Workbook.Worksheets.Add("Breakdown Report");
            worksheet.Cells["A1"].Value = "ID";
            worksheet.Cells["B1"].Value = "Equipment ID";
            worksheet.Cells["C1"].Value = "Description";

            int row = 2;
            foreach (var breakdown in breakdowns)
            {
                worksheet.Cells[row, 1].Value = breakdown.Id;
                worksheet.Cells[row, 2].Value = breakdown.EquipmentId;
                worksheet.Cells[row, 3].Value = breakdown.Description;
                row++;
            }

            return package.GetAsByteArray();
        }
    }
}
