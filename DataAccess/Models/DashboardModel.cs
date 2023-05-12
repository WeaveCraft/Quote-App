using DataAccess.DTO;

namespace DataAccess.Models;
public class DashboardModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<QuoteDTO> Quotes { get; set; } = new();
    public DashboardModel(string name)
    {
        Name = name;
    }
}