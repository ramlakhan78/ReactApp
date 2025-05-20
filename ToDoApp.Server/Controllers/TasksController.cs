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
    public async Task<ResponseModel> Get() => await taskService.GetAllTaskAsync();

    #endregion [Get All Task]

    #region [Get Task By Id]

    [HttpGet("get/{id}")]
    public async Task<ResponseModel> Get(int id) => await taskService.GetTaskByIdAsync(id);

    #endregion [Get Task By Id]

    #region [Add or Update task]
    [HttpPost("save-task")]
    public async Task<ResponseModel> Post([FromBody] TasksDto model) => await taskService.AddOrUpdateTaskAsync(model);

    #endregion [Add or Update task]

    #region [Delete Task]
    [HttpDelete("delete/{id}")]
    public async Task<ResponseModel> Delete(int id) => await taskService.DeleteAsync(id);

    #endregion [Delete Task]

    #region [Get Task By Group Id]
    [HttpGet("get-taskList-by-groupId/{groupId}")]
    public async Task<ResponseModel> GetAllTaskByGroupId(int groupId) => await taskService.GetAllTaskByGroupId(groupId);
    #endregion [Get Task By Group Id]

    #region [Get All Group With Their Task]
    [HttpGet("get-all-groups-taskList")]
    public async Task<ResponseModel> GetAllGroupsTaskListAsync() => await taskService.GetAllGroupWithTaskListAsync();

    #endregion [Get All Group With Their Task ]

    #region [Toggle Star Task]
    [HttpPut("toggle-star/{taskId}")]
    public async Task<ResponseModel> ToggleStarTask(int taskId) => await taskService.ToggleStarTaskAsync(taskId);
    #endregion [Toggle Star Task]


}

