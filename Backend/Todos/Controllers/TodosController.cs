

using Microsoft.AspNetCore.Mvc;
using Web.Backend.Todos.Models;

namespace Web.Backend.Todos.Controllers;


[ApiController]
[Route("[Controller]")]
public class TodosController : ControllerBase, ITodosController {
    private readonly ILogger<TodosController> _logger;
    
      public TodosController(ILogger<TodosController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<TodoModel> Get()
    {
        throw new NotImplementedException();
    }
}

