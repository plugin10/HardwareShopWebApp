using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Tools;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class AplicationServicesExtencions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CrosPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000"); //allow any method, any header, and only from localhost:3000
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly); //add mediatr assembly to services

            services.AddAutoMapper(typeof(MappingProfiles).Assembly); //add automapper assembly to services

            return services;
        }
    }
}