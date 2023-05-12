using System.Net.Http.Json;
using DataAccess.DTO;
namespace DataAccess.Repository.Interface;

public interface IDashboardRepository
{
    Task<int> CreateDashboard(string name);
    Task<List<DashboardDTO>> GetAllDashboards();
    Task<bool> DeleteDashboard(int id);
    Task<List<DashboardQuotesDTO>> GetDashboardQuotes(int dashboardId);
    Task<DashboardDTO> GetLatestDashboard();

    Task<int> SaveDashboard();
}
