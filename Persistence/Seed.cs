using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Tools.Any() && context.Users.Any()) return;

            var tools = new List<Tool>
            {
                new Tool
                {
                    Name = "Test name",
                    Description = "Test description",
                    Price = 9.99m,
                    PictureUrl = "test.jpg",
                    Type = "Test type"
                },
                new Tool
                {
                    Name = "Test name 2",
                    Description = "Test description 2",
                    Price = 19.99m,
                    PictureUrl = "test2.jpg",
                    Type = "Test type 2"
                },
                new Tool
                {
                    Name = "Test name 3",
                    Description = "Test description 3",
                    Price = 29.99m,
                    PictureUrl = "test3.jpg",
                    Type = "Test type 3"
                }
            };

            var users = new List<User>
            {
                new User
                {
                    Username = "Admin",
                    Password = "Admin"
                }
            };

            await context.Users.AddRangeAsync(users);
            await context.Tools.AddRangeAsync(tools);
            await context.SaveChangesAsync();
        }
    }
}