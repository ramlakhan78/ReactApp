using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;
using static ToDoApp.Server.Contracts.IBaseRepository;

namespace ToDoApp.Server.Services;

public class TaskService(IBaseRepository<TasksDto> taskRepo) : ITaskService
{
    public async Task<ResponseModel> GetAllTaskAsync()
    {
        ResponseModel response = new();

        try
        {
            response.Data = await taskRepo.GetAllAsync();
            response.IsSuccess = true;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }

    public async Task<ResponseModel> GetTaskByIdAsync(int id)
    {
        ResponseModel response = new();
        try
        {
            response.Data = await taskRepo.GetByIdAsync(id);
            response.IsSuccess = true;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }

    public async Task<ResponseModel> AddTaskAsync(TasksDto task)
    {
        ResponseModel response = new();
        try
        {
            await taskRepo.AddAsync(task);
            response.IsSuccess = true;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }

    public async Task<ResponseModel> DeleteAsync(int id)
    {
        ResponseModel response = new();
        try
        {
            await taskRepo.DeleteAsync(id);
            response.IsSuccess = true;
            response.Message = "Task deleted successfully";
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }
}
