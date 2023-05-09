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
            if(context.Items.Any()) return;

            var items = new List<Item>
            {
                new Item
                {
                    Name = "Test name",
                    Description = "Test description",
                    Price = 9.99m,
                    PictureUrl = "test.jpg",
                    Type = "Test type"
                },
                new Item
                {
                    Name = "Test name 2",
                    Description = "Test description 2",
                    Price = 19.99m,
                    PictureUrl = "test2.jpg",
                    Type = "Test type 2"
                },
                new Item
                {
                    Name = "Test name 3",
                    Description = "Test description 3",
                    Price = 29.99m,
                    PictureUrl = "test3.jpg",
                    Type = "Test type 3"
                }
            };

            await context.Items.AddRangeAsync(items);
            await context.SaveChangesAsync();
        }
    }
}