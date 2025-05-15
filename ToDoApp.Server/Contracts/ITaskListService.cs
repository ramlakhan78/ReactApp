using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Contracts
{
    public interface ITaskListService
    {
        /// <summary>
        /// Get all task lists
        /// </summary>
        /// <returns>return response <see cref="ResponseModel"/></returns>
       Task<ResponseModel> GetTaskListsAsync();

        /// <summary>
        /// Get task list by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return response <see cref="ResponseModel"/></returns>
        Task<ResponseModel> GetTaskListByIdAsync(int id);

        /// <summary>
        /// Add a new task list
        /// </summary>
        /// <param name="taskList"></param>
        /// <returns>return response <see cref="ResponseModel"/></returns>
        Task<ResponseModel> AddTaskListAsync(TaskList taskList);

    }
}
