using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope(); //create scope to access services
var services = scope.ServiceProvider; //get services

try
{
    var context = services.GetRequiredService<DataContext>(); //get datacontext
    await context.Database.MigrateAsync(); //migrate database
    await Seed.SeedData(context); //seed data
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>(); //get logger
    logger.LogError(ex, "An error occured during migration"); //log error
}

app.Run();
