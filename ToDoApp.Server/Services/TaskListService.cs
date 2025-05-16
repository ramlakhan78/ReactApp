using Microsoft.AspNetCore.Mvc;
using NPoco;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Services
{
    public class TaskListService(IDatabase database) : ITaskListService
    {
        public async Task<ResponseModel> GetTaskListsAsync()
        {
            ResponseModel response = new();
            try
            {
                response.Data = await database.FetchAsync<TaskList>("SELECT * FROM TaskList").ConfigureAwait(false) ?? new();
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> GetTaskListByIdAsync(int id)
        {
            ResponseModel response = new();
            try
            {
                response.Data = await database.SingleOrDefaultAsync<TaskList>("SELECT * FROM TaskList WHERE ListId = @0", id) ?? new();
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> AddTaskListAsync(TaskList taskList)
        {
            ResponseModel response = new();
            try
            {
                using var db = database.GetTransaction();

                 await database.InsertAsync(taskList);
                response.IsSuccess = true;
                response.Message = "Task list added successfully";
                db.Complete();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
