using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Models
{
    public class GroupTaskListVM 
    {
        public string? GroupName { get; set; }
        public List<TasksDto>? TaskList { get; set; }
        public List<TasksDto>? CompletedTaskList { get; set; } 
    }

}
