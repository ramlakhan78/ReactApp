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
            var result = await taskRepo.GetByIdAsync(id);
            response.Data = new
            {
                TaskId = result?.TaskId,
                Title = result?.Title,
                Description = result?.Description,
                ToDoDate = result?.ToDoDate != null ? result?.ToDoDate?.ToString("yyyy-MM-dd") : null,
                CreateDate = result?.CreateDate,
                CompleteDate = result?.CompleteDate,
                IsStarred = result?.IsStarred,
                IsCompleted = result?.IsCompleted,
                TaskGroupId = result?.TaskGroupId
            };


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
            if (task.TaskId == 0)
            {
                task.CompleteDate = null;
                task.CreateDate = DateTime.Now;
                await taskRepo.AddAsync(task);
                response.Message = "task added successfully!!";
            }
            else
            {
                if (task.IsCompleted)
                    task.CompleteDate = DateTime.Now;
                else
                    task.CompleteDate = null;
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
                    GroupId = groupDetail.ListId,
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

    public async Task<ResponseModel> GetAllGroupWithTaskListAsync()
    {
        ResponseModel response = new();
        try
        {
            var groupList = await taskGroupRepo.GetAllAsync();
            var taskList = await taskRepo.GetAllAsync();
            response.Data = groupList.Select(group => new GroupTaskListVM
            {
                GroupId = group.ListId,
                GroupName = group.ListName,
                SortBy =group.SortBy,
                isEnableShow = group.IsEnableShow,
                TaskList = taskList.Where(x => x.TaskGroupId == group.ListId && !x.IsCompleted)
                                   .OrderBy(x=> group.SortBy == "Title" ? x.Title :
                                   group.SortBy == "Date" ? x.ToDoDate.ToString() :
                                   group.SortBy == "Description" ? x.Description :
                                   x.TaskId.ToString()).ToList(),
                CompletedTaskList = taskList.Where(x => x.TaskGroupId == group.ListId && x.IsCompleted).ToList()
            }).ToList();
            response.IsSuccess = true;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<ResponseModel> ToggleStarTaskAsync(int taskId)
    {
        ResponseModel response = new();
        try
        {
            var task = await taskRepo.GetByIdAsync(taskId);
            if (task != null)
            {
                task.IsStarred = !task.IsStarred;
                await taskRepo.UpdateAsync(task);
                response.IsSuccess = true;
                response.Message = "Task starred status updated successfully";
            }
            else
            {
                response.IsSuccess = false;
                response.Message = "Task not found";
            }
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;

    }

    public async Task<ResponseModel> GetStarredTaskAsync()
    {
        ResponseModel response = new();
        try
        {
            var group = await taskGroupRepo.GetByIdAsync(1).ConfigureAwait(false);
            var starredTasks = await taskRepo.GetAllAsync().ConfigureAwait(false);
            response.Data = new GroupTaskListVM
            {
                GroupId = group.ListId,
                GroupName = "starred tasks",
                SortBy = group.SortBy,
                TaskList = starredTasks.Where(x => x.IsStarred && !x.IsCompleted)
                                   .OrderBy(x => group.SortBy == "Title" ? x.Title :
                                   group.SortBy == "Date" ? x.ToDoDate.ToString() :
                                   group.SortBy == "Description" ? x.Description :
                                   x.TaskId.ToString()).ToList(),
                CompletedTaskList = []
            };
            response.IsSuccess = true;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }

    public async Task<ResponseModel> DeleteCompletedTaskAsync(int groupId)
    {
        ResponseModel response = new();
        try
        {
            var completedTasks = await taskRepo.QueryAsync("Select * from Task where TaskGroupId =@0 and IsCompleted =1", groupId).ConfigureAwait(false);
            foreach (var task in completedTasks)
            {
                try
                {
                    await taskRepo.DeleteAsync(task.TaskId);
                }
                catch (Exception)
                {
                }
            }
            response.IsSuccess = true;
            response.Message = "Completed tasks deleted successfully";
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        return response;
    }
}
