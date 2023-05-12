using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Web.Backend.Quotes.Utils;

namespace Web.Backend.Quotes.Controllers;

[ApiController]
[Route("api/v1/quote")]
public class QuotesController : ControllerBase
{
    public QuotesController()
    {
    }

    [HttpGet]
    public async Task<ActionResult<QuoteModel>> GetQuote()
    {
        using (HttpClient client = new HttpClient())
        {
            var result = await client.GetAsync("https://type.fit/api/quotes");  // Perform a GET call against your endpoint asynchronously

            if (!result.IsSuccessStatusCode)     // Check that the request returned successfully before we proceed
            {
                return NotFound();  // Return 404 if content cannot be found.
            }

            var quoteListString = await result.Content.ReadAsStringAsync();     // Endpoint returns text/plain, not JSON, so we'll grab the string

            var quoteList = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<QuoteModel>>(quoteListString);     // use Newtonsoft to deserialize it into a list we can manipulate.

            if (quoteList == null)
            {
                return NotFound();
            }

            var quote = quoteList.ElementAt(new Random().Next(0, quoteList.Count() - 1));

            var duplicate = QuoteManagement.CheckForDuplicated(quote);

            while (duplicate)
            {
                quote = quoteList.ElementAt(new Random().Next(0, quoteList.Count() - 1));
            }

            QuoteManagement.SaveToTextFile(quote);

            return quote;
        }

    }

    [HttpDelete]
    public ActionResult ClearFile()
    {
        QuoteManagement.ClearFile();
        return Ok();
    }


}