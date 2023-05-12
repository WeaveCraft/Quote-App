using DataAccess.DTO;
using DataAccess.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Web.Backend.Dashboard;

[ApiController]
[Route("api/v1/dashboard")]
public class DashboardController : ControllerBase
{
    private IDashboardRepository _dashboardRepository;

    public DashboardController(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        List<DashboardDTO> result = await _dashboardRepository.GetAllDashboards();

        if (result.Count == 0)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpGet("latest")]
    public async Task<ActionResult<DashboardDTO>> GetDashboard()
    {
        DashboardDTO? result = await _dashboardRepository.GetLatestDashboard();

        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpGet("getQuotesRelatedToDashboard/")]
    public async Task<IActionResult> GetDashboardQuotes(int dashboardId)
    {
        List<DashboardQuotesDTO> result = await _dashboardRepository.GetDashboardQuotes(dashboardId);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }



    [HttpPost]
    public async Task<IActionResult> AddDashboard(string name)
    {
        int result = await _dashboardRepository.CreateDashboard(name);

        return Ok(result);
    }

    [HttpPost("save")]
    public async Task<IActionResult> SaveDashboard()
    {
        var result = await _dashboardRepository.SaveDashboard();

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteOne(int id)
    {
        var result = await _dashboardRepository.DeleteDashboard(id);

        return Ok(result);
    }
}
