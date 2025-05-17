using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Contracts
{
    public interface ITaskService
    {
        /// <summary>
        /// Get all task 
        /// </summary>
        /// <returns>return response <see cref="ResponseModel"/></returns>
        Task<ResponseModel> GetAllTaskAsync();

        /// <summary>
        /// Get task by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseModel> GetTaskByIdAsync(int id);

        /// <summary>
        /// Add a new task
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        Task<ResponseModel> AddTaskAsync(TasksDto task);

        /// <summary>
        /// delete a task
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        Task<ResponseModel> DeleteAsync(int id);
    }
}
