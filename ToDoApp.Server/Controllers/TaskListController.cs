using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskListController(ITaskListService taskListService) : ControllerBase
{
    #region [Get Task List]
    // GET: api/task-list
    [HttpGet("task-list")]
    public async Task<ResponseModel> Get() => await taskListService.GetTaskListsAsync();
    #endregion [Get Task List]

    #region [Get Task List By Id]
    // GET api/task-list/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id) => Ok(await taskListService.GetTaskListByIdAsync(id));

    #endregion [Get Task List By Id]

    #region [Add Task List]
    // POST api/add-task-list
    [HttpPost("add-list")]
    public async Task<IActionResult> Post([FromBody] TaskList model) =>Ok(await taskListService.AddTaskListAsync(model));

    #endregion [Add Task List]
}

