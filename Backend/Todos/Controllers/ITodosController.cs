namespace Web.Backend.Todos.Controllers;
using Web.Backend.Todos.Models;

public interface ITodosController {
    public IEnumerable<TodoModel> Get();
}