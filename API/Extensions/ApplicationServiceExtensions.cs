using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static WebApplication AddCustomServices(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("DevCorsPolicy");
        }

        if (app.Environment.IsProduction())
        {
            app.UseHttpsRedirection();
            app.UseCors("ProdCorsPolicy");
        }

        return app;
    }

    public static async Task<WebApplication> ConfigureDatabase(this WebApplication app)
    {
        // Explicit cleanup
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<DataContext>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            await context.Database.MigrateAsync();

            if (app.Environment.IsDevelopment() && !userManager.Users.Any() && !context.Activities.Any())
            {
                app.Logger.LogInformation("Seeding database with mock data");
                await Seed.SeedData(context, userManager);
            }

        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An Error occurred during migration");
        }

        return app;
    }
}