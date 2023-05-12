using System.Net.Http.Json;
using DataAccess.Context.Interface;
using DataAccess.DTO;
using DataAccess.Repository.Interface;

namespace DataAccess.Repository;

public class DashboardRepository : IDashboardRepository
{
    private readonly IDbContext _dbContext;

    public DashboardRepository(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<int> CreateDashboard(string name)
    {
        return (int)await _dbContext.EditData("INSERT INTO dashboards (name) VALUES (@Name);", new { name });
    }

    public async Task<int> SaveDashboard()
    {
        DashboardDTO dashboard = await GetLatestDashboard();

        int id = dashboard.Id;

        return await _dbContext.EditData("UPDATE quotes SET dashboard_id = @id WHERE dashboard_id = 0", new { id });
    }

    public async Task<List<DashboardDTO>> GetAllDashboards()
    {
        var dashboardsList = await _dbContext.GetAll<DashboardDTO>("SELECT id, name FROM dashboards WHERE id <> 0", new { });

        return dashboardsList;
    }

    public async Task<List<DashboardQuotesDTO>> GetDashboardQuotes(int dashboardId)
    {
        var dashboardsQuotes = await _dbContext.GetAll<DashboardQuotesDTO>("SELECT quotes.id, quotes.text, dashboard_id FROM quotes WHERE dashboard_id = @dashboardId", new { dashboardId });

        return dashboardsQuotes;
    }
    public async Task<DashboardDTO> GetLatestDashboard()
    {
        return await _dbContext.GetASync<DashboardDTO>("SELECT id, name FROM dashboards WHERE id <> 0 ORDER BY id desc LIMIT 1 ", new { });
    }

    public async Task<bool> DeleteDashboard(int id)
    {
        var deleteDashboard = await _dbContext.EditData("DELETE FROM Dashboards WHERE id=@id;", new { id });

        if (deleteDashboard == 0)
        {
            return false;
        }

        return true;
    }
}
