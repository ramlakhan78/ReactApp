using NPoco;

namespace ToDoApp.Server.Models.Entity;

[TableName("TaskList")]
[PrimaryKey("ListId", AutoIncrement = true)]
public class TaskList
{
    public int ListId { get; set; }
    public string? ListName { get; set; }
}

