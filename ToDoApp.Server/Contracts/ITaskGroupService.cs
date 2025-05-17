using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Contracts
{
    public interface ITaskGroupService
    {
        /// <summary>
        /// Get all task Groups
        /// </summary>
        /// <returns>return response <see cref="ResponseModel"/></returns>
        Task<ResponseModel> GetTaskGroupsAsync();

        /// <summary>
        /// Get task group by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return response <see cref="ResponseModel"/></returns>
        Task<ResponseModel> GetTaskGroupByIdAsync(int id);

        /// <summary>
        /// Add a new task group
        /// </summary>
        /// <param name="taskList"></param>
        /// <returns>return response <see cref="ResponseModel"/></returns>
        Task<ResponseModel> AddTaskGroupAsync(TaskGroup model);

    }
}
