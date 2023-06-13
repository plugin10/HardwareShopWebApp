using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        [HttpGet] // api/users
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await Mediator.Send(new List.Query());
        }

        // [HttpGet("{id}")] // api/items/{id}
        // public async Task<ActionResult<User>> GetUser(Guid id)
        // {
        //     return await Mediator.Send(new Details.Query {Id = id});
        // }
        
    }
}