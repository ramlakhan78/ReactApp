using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;
using static ToDoApp.Server.Contracts.IBaseRepository;

namespace ToDoApp.Server.Services;

public class TaskService(IBaseRepository<TasksDto> taskRepo, IBaseRepository<TaskGroup> taskGroupRepo) : ITaskService
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

    public async Task<ResponseModel> AddOrUpdateTaskAsync(TasksDto task)
    {
        ResponseModel response = new();
        try
        {
            if (task.TaskId > 0)
            {
                task.CompleteDate = null;
                task.CreateDate = DateTime.Now;
                await taskRepo.AddAsync(task);
                response.Message = "task added successfully!!";
            }
            else
            {
                await taskRepo.UpdateAsync(task);
                response.Message = "task updated successfully!!";
            }
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

    public async Task<ResponseModel> GetAllTaskByGroupId(int groupId)
    {
        ResponseModel response = new();
        try
        {
            var groupDetail = await taskGroupRepo.GetByIdAsync(groupId);
            var taskList = await taskRepo.QueryAsync("SELECT * FROM Task WHERE TaskGroupId = @0", groupId);

            response = new ResponseModel
            {
                IsSuccess = true,
                Data = new GroupTaskListVM
                {
                    GroupName = groupDetail.ListName,
                    TaskList = taskList.Where(x => !x.IsCompleted).ToList() ?? new(),
                    CompletedTaskList = taskList.Where(x => x.IsCompleted).ToList() ?? new()
                }
            };
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }
}
