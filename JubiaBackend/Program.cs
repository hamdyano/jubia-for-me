using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using JubiaBackend.Data; // change this namespace to match your context
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddControllers();


/*🟡 Add PostgreSQL connection
builder.Services.AddDbContext<JubiaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); */


// SQL Server configuration (UPDATED)
builder.Services.AddDbContext<JubiaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🟢 Configure Kestrel from appsettings.json
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Configure(builder.Configuration.GetSection("Kestrel"));
});

// 🔵 AutoMapper setup
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// 🔵 Add Swagger & API explorer
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Jubia API",
        Version = "v1",
        Description = "Backend API for Jubia application"
    });
});

builder.Services.AddControllers(); 
var app = builder.Build();

// 🔄 Development-only Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Jubia API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization(); 

app.MapControllers(); 

app.Run();