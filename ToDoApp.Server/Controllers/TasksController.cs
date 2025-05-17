using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;
using static ToDoApp.Server.Contracts.IBaseRepository;

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

    #region [Get Task By Group Id]
    [HttpPost("add-task")]
    public async Task<ResponseModel> Post([FromBody] TasksDto model) => await taskService.AddTaskAsync(model);

    #endregion [Get Task By Group Id]

    #region [Update Task]
    [HttpDelete("delete/{id}")]
    public async Task<ResponseModel> Delete(int id) => await taskService.DeleteAsync(id);

    #endregion [Update Task]
}

