using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Controllers;

[Route("api/task-list")]
[ApiController]
public class TaskListController(ITaskListService taskListService) : ControllerBase
{
    #region [Get Task List]
    // GET: api/task-list
    [HttpGet]
    public async Task<ResponseModel> Get() => await taskListService.GetTaskListsAsync();
    #endregion [Get Task List]

    #region [Get Task List By Id]
    // GET api/task-list/{id}
    [HttpGet("{id}")]
    public async Task<ResponseModel> Get(int id) => await taskListService.GetTaskListByIdAsync(id);

    #endregion [Get Task List By Id]

    #region [Add Task List]
    // POST api/add-task-list
    [HttpPost("add-task-list")]
    public void Post([FromBody] TaskList model) => taskListService.AddTaskListAsync(model);

    #endregion [Add Task List]
}

