using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.AddCustomServices();
app.UseAuthorization();
app.MapControllers();

await app.ConfigureDatabase();

app.Run();