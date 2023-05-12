using DataAccess.DTO;
using DataAccess.Repository.Interface;
using Microsoft.AspNetCore.Mvc;


namespace Web.Backend.Quotes.Controllers;

[ApiController]
[Route("api/v2/quote")]
public class QuotesController_v2 : ControllerBase
{
    private IQuoteRepository _quoteRepository;

    public QuotesController_v2(IQuoteRepository quoteRepository)
    {
        _quoteRepository = quoteRepository;
    }


    [HttpPost]
    public async Task<ActionResult<AddQuoteDto>> AddQuote(int dashboardId)
    {
        var result = await _quoteRepository.CreateQuote(dashboardId);

        return Ok(result);
    }



    [HttpGet]
    public async Task<IActionResult> GetQuote()
    {
        QuoteDTO? result = await _quoteRepository.GetLatestQuote();

        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }


    [HttpDelete]
    public async Task<IActionResult> DeleteQuoteById(int id)
    {
        var result = await _quoteRepository.DeleteQuoteById(id);

        if (result == false)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpDelete("dashboard/{id:int}")]
    public async Task<IActionResult> DeleteByDashboard_Id(int id)
    {
        var result = await _quoteRepository.DeleteAllQuotes(id);

        return Ok(result);
    }


}