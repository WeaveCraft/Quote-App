using DataAccess.Context.Interface;
using DataAccess.Models;

namespace DataAccess.Context;

public class ExternalApi : IExternalApi
{
    public async Task<List<QuoteModel>> GetAllQuotes()
    {
        using (HttpClient client = new HttpClient())
        {
            var result = await client.GetAsync("https://type.fit/api/quotes");  // Perform a GET call against your endpoint asynchronously

            var quoteListString = await result.Content.ReadAsStringAsync();     // Endpoint returns text/plain, not JSON, so we'll grab the string

            var quoteList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<QuoteModel>>(quoteListString);  // use Newtonsoft to deserialize it into a list we can manipulate. 

            if (quoteList == null)
            {
                return quoteList = new();
            }

            return quoteList;
        }
    }

    public async Task<QuoteModel> GetRandomQuote()
    {
        var quoteList = await GetAllQuotes();

        var quote = quoteList.ElementAt(new Random().Next(0, quoteList.Count() - 1));

        return quote;
    }
}