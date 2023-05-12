using DataAccess.Context.Interface;
using DataAccess.DTO;
using DataAccess.Models;
using DataAccess.Repository.Interface;

namespace DataAccess.Repository;

public class QuoteRepository : IQuoteRepository
{
    private readonly IDbContext _dbContext;
    private readonly IDashboardRepository _dashRepo;

    private readonly IExternalApi _externalApi;

    public QuoteRepository(IDbContext dbContext, IExternalApi externalApi, IDashboardRepository dashRepo)
    {
        _dbContext = dbContext;
        _externalApi = externalApi;
        _dashRepo = dashRepo;
    }

    public async Task<int> CreateQuote(int dashboardId)
    {
        QuoteModel randomQuote = await _externalApi.GetRandomQuote();
        List<DashboardQuotesDTO> dashboardQuotes = await _dashRepo.GetDashboardQuotes(dashboardId);


        IEnumerable<bool> duplicate = dashboardQuotes.GroupBy(quotes => randomQuote.Text == quotes.Text).Where(c => c.Count() > 1).Select(x => x.Key);

        while (duplicate.Count() > 1)
        {
            randomQuote = await _externalApi.GetRandomQuote();
            duplicate = dashboardQuotes.GroupBy(text => randomQuote.Text == text.Text).Where(c => c.Count() > 1).Select(x => x.Key);
        }

        randomQuote.Dashboard_Id = dashboardId;

        return await _dbContext.EditData("INSERT INTO quotes (text, author, dashboard_id) VALUES (@Text, @Author, @Dashboard_Id)", randomQuote);
    }

    public async Task<QuoteDTO?> GetLatestQuote()
    {
        return await _dbContext.GetASync<QuoteDTO>("SELECT id, text, dashboard_id FROM quotes ORDER BY id desc LIMIT 1", new { });
    }



    public async Task<bool> DeleteQuoteById(int id)
    {
        int deleteQuote = await _dbContext.EditData("DELETE FROM quotes WHERE id=@id;", new { id });

        if (deleteQuote == 0)
        {
            return false;
        }

        return true;
    }

    public async Task<bool> DeleteAllQuotes(int dashboard_id)
    {
        int deleteAll = await _dbContext.EditData("DELETE FROM quotes WHERE dashboard_id=@dashboard_id", new { dashboard_id });

        return true;
    }

    public Task<List<QuoteDTO>?> GetQuoteList()
    {
        throw new NotImplementedException();
    }
}
