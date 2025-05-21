using Microsoft.AspNetCore.Mvc;
using NPoco;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;
using static ToDoApp.Server.Contracts.IBaseRepository;

namespace ToDoApp.Server.Services
{
    public class TaskGroupService(IBaseRepository<TaskGroup> taskGroupRepo) : ITaskGroupService
    {
        public async Task<ResponseModel> GetTaskGroupsAsync()
        {
            ResponseModel response = new();
            try
            {
                response.Data = await taskGroupRepo.GetAllAsync().ConfigureAwait(false);
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> GetTaskGroupByIdAsync(int id)
        {
            ResponseModel response = new();
            try
            {
                response.Data = await taskGroupRepo.GetByIdAsync(id).ConfigureAwait(false) ?? new();
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> AddOrUpdateTaskGroupAsync(TaskGroup model)
        {
            ResponseModel response = new();
            try
            {
                if (model.ListId == 0)
                {

                    await taskGroupRepo.AddAsync(model);
                    response.Message = "Task Group added successfully";
                }
                else
                {

                    await taskGroupRepo.UpdateAsync(model);
                    response.Message = "Task Group updated successfully";
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

        public async Task<ResponseModel> DeleteGroupAsync(int id)
        {
            ResponseModel response = new();
            try
            {
                await taskGroupRepo.DeleteAsync(id);
                response.IsSuccess = true;
                response.Message = "Task Group deleted successfully";
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
