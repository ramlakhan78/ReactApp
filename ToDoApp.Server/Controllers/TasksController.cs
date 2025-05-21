using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Controllers;

[Route("[controller]")]
[ApiController]
public class TasksController(ITaskService taskService) : ControllerBase
{
    #region [Get All Task]
    [HttpGet("task-list")]
    public async Task<IActionResult> Get()
    {
        var response = await taskService.GetAllTaskAsync();
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    #endregion [Get All Task]

    #region [Get Task By Id]

    [HttpGet("get/{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var response = await taskService.GetTaskByIdAsync(id);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    #endregion [Get Task By Id]

    #region [Add or Update task]
    [HttpPost("save-task")]
    public async Task<IActionResult> Post([FromBody] TasksDto model)
    {
        var response = await taskService.AddOrUpdateTaskAsync(model);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    #endregion [Add or Update task]

    #region [Delete Task]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await taskService.DeleteAsync(id);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    #endregion [Delete Task]

    #region [Get Task By Group Id]
    [HttpGet("get-taskList-by-groupId/{groupId}")]
    public async Task<IActionResult> GetAllTaskByGroupId(int groupId)
    {
        var response = await taskService.GetAllTaskByGroupId(groupId);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    #endregion [Get Task By Group Id]

    #region [Get All Group With Their Task]
    [HttpGet("get-all-groups-taskList")]
    public async Task<IActionResult> GetAllGroupsTaskListAsync()
    {
        var response = await taskService.GetAllGroupWithTaskListAsync();
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    #endregion [Get All Group With Their Task ]

    #region [Toggle Star Task]
    [HttpPut("toggle-star/{taskId}")]
    public async Task<IActionResult> ToggleStarTask(int taskId)
    {
        var response = await taskService.ToggleStarTaskAsync(taskId);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    #endregion [Toggle Star Task]

    #region [Get All Starred Task]
    [HttpGet("get-starred-task")]
    public async Task<IActionResult> GetAllStarredTask()
    {
        var response = await taskService.GetStarredTaskAsync();
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    #endregion [Get All Starred Task]

    #region [Delete Completed Task]

    [HttpDelete("delete-completed-task/{groupId}")]
    public async Task<IActionResult> DeleteCompletedTask(int groupId)
    {
        var response = await taskService.DeleteCompletedTaskAsync(groupId);
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    #endregion [Delete Completed Task]

}

