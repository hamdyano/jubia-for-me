using Jubia.API.Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// 1. ADD SERVICES HERE (BEFORE Build())
builder.Services.AddDbContext<JubiaDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("JubiaConnection")));

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS here (BEFORE Build())
builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowAll", builder => 
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

var app = builder.Build();

// 2. CONFIGURE MIDDLEWARE HERE (AFTER Build())
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// Use CORS middleware
app.UseCors("AllowAll");

// Static files and routing
app.UseStaticFiles();
app.UseRouting();

// Map controllers
app.MapControllers();

// Fallback to Angular
app.MapFallbackToFile("index.html");

app.Run();





