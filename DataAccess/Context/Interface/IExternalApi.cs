using DataAccess.Models;

namespace DataAccess.Context.Interface;

public interface IExternalApi
{
    Task<List<QuoteModel>> GetAllQuotes();
    Task<QuoteModel> GetRandomQuote();

}