﻿using Microsoft.AspNetCore.Identity;
using Activity = Domain.Activity;
using CategoryEnum = Domain.CategoryEnum;
using AppUser = Domain.AppUser;
using System.Globalization;

namespace Persistence;

public static class Seed
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

        }

        Console.WriteLine("HELLO");
        Console.WriteLine(DateTime.UtcNow.AddMonths(-2).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture));


        if (context.Activities.Any()) return;

        var activities = new List<Activity>
        {
            new Activity
            {
                Title = "Past Activity 1",
                Date = DateTime.UtcNow.AddMonths(-2).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 2 months ago",
                Category = CategoryEnum.Drinks,
                City = "London",
                Venue = "Pub",
            },
            new Activity
            {
                Title = "Past Activity 2",
                Date = DateTime.UtcNow.AddMonths(-1).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 1 month ago",
                Category = CategoryEnum.Culture,
                City = "Paris",
                Venue = "Louvre",
            },
            new Activity
            {
                Title = "Future Activity 1",
                Date = DateTime.UtcNow.AddMonths(1).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 1 month in future",
                Category = CategoryEnum.Culture,
                City = "London",
                Venue = "Natural History Museum",
            },
            new Activity
            {
                Title = "Future Activity 2",
                Date = DateTime.UtcNow.AddMonths(2).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 2 months in future",
                Category = CategoryEnum.Music,
                City = "London",
                Venue = "O2 Arena",
            },
            new Activity
            {
                Title = "Future Activity 3",
                Date = DateTime.UtcNow.AddMonths(3).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 3 months in future",
                Category = CategoryEnum.Drinks,
                City = "London",
                Venue = "Another pub",
            },
            new Activity
            {
                Title = "Future Activity 4",
                Date = DateTime.UtcNow.AddMonths(4).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 4 months in future",
                Category = CategoryEnum.Drinks,
                City = "London",
                Venue = "Yet another pub",
            },
            new Activity
            {
                Title = "Future Activity 5",
                Date = DateTime.UtcNow.AddMonths(5).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 5 months in future",
                Category = CategoryEnum.Drinks,
                City = "London",
                Venue = "Just another pub",
            },
            new Activity
            {
                Title = "Future Activity 6",
                Date = DateTime.UtcNow.AddMonths(6).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 6 months in future",
                Category = CategoryEnum.Music,
                City = "London",
                Venue = "Roundhouse Camden",
            },
            new Activity
            {
                Title = "Future Activity 7",
                Date = DateTime.UtcNow.AddMonths(7).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 2 months ago",
                Category = CategoryEnum.Travel,
                City = "London",
                Venue = "Somewhere on the Thames",
            },
            new Activity
            {
                Title = "Future Activity 8",
                Date = DateTime.UtcNow.AddMonths(8).ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                Description = "Activity 8 months in future",
                Category = CategoryEnum.Film,
                City = "London",
                Venue = "Cinema",
            }
        };

        await context.Activities.AddRangeAsync(activities)!;
        await context.SaveChangesAsync();
    }
}