using Application.Tools;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ToolsController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ToolsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet] // api/items
        public async Task<ActionResult<List<Tool>>> GetItems()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // api/items/{id}
        public async Task<ActionResult<Tool>> GetItem(Guid id)
        {
            return await _mediator.Send(new Details.Query {Id = id});
        }
    }
}