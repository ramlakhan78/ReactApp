using Microsoft.Data.SqlClient; // Add this import for SqlClientFactory  
using Microsoft.Extensions.DependencyInjection;
using NPoco;
using ToDoApp.Server.Contracts;
using ToDoApp.Server.Services;
using static ToDoApp.Server.Contracts.IBaseRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.  
builder.Services.AddScoped<IDatabase>(provider =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new Database(connectionString, DatabaseType.SqlServer2012, SqlClientFactory.Instance); // Pass the connection instead of a string  
});
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<ITaskGroupService, TaskGroupService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle  
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.  
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
