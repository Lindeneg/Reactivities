using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class BuilderServiceExtensions
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(opt => { opt.UseSqlite(config.GetConnectionString("DefaultConnection")); });

        services.AddCors(opt =>
        {
            opt.AddPolicy("DevCorsPolicy",
                policy => { policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin(); });

            opt.AddPolicy("ProdCorsPolicy",
                policy => { policy.WithMethods("GET", "POST", "PATCH", "DELETE").AllowAnyHeader().WithOrigins("https://app.lindeneg.org"); });
        });

        services.AddMediatR(typeof(GetActivities.Handler));

        services.AddAutoMapper(typeof(MappingProfiles).Assembly);

        services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
        services.AddValidatorsFromAssemblyContaining<CreateActivity.CommandValidator>();
        services.AddHttpContextAccessor();
        services.AddScoped<IUserAccessor, UserAccessor>();


        return services;
    }
}