using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskGroupsController(ITaskGroupService taskListService) : ControllerBase
{
    #region [Get Task Group List]
    [HttpGet("task-group-list")]
    public async Task<ResponseModel> Get() => await taskListService.GetTaskGroupsAsync();
    #endregion [Get Task Group List]

    #region [Get Task Group By Id]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id) => Ok(await taskListService.GetTaskGroupByIdAsync(id));

    #endregion [Get Task Group By Id]

    #region [Add Task Group]
    [HttpPost("add-group")]
    public async Task<IActionResult> Post([FromBody] TaskGroup model) =>Ok(await taskListService.AddTaskGroupAsync(model));

    #endregion [Add Task Group]
}

