using DataAccess.DTO;

namespace DataAccess.Repository.Interface;

public interface IQuoteRepository
{
    Task<int> CreateQuote(int dashboardId);
    Task<List<QuoteDTO>?> GetQuoteList();
    Task<QuoteDTO?> GetLatestQuote();
    Task<bool> DeleteQuoteById(int id);
    Task<bool> DeleteAllQuotes(int dashboardId);
}