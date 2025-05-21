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
    public async Task<IActionResult> Get()
    {
        var response = await taskListService.GetTaskGroupsAsync();
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    #endregion [Get Task Group List]

    #region [Get Task Group By Id]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var response = await taskListService.GetTaskGroupByIdAsync(id);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    #endregion [Get Task Group By Id]

    #region [Add Task Group]
    [HttpPost("save-group")]
    public async Task<IActionResult> Post([FromBody] TaskGroup model)
    {
        var response = await taskListService.AddOrUpdateTaskGroupAsync(model);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    #endregion [Add Task Group]

    #region [Delete Task Group]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await taskListService.DeleteGroupAsync(id);
        if (response.IsSuccess)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }
    #endregion [Delete Task Group]
}

