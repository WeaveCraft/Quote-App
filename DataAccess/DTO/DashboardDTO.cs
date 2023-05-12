namespace DataAccess.DTO;
public class DashboardDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<QuoteDTO>? Quotes { get; set; }

}