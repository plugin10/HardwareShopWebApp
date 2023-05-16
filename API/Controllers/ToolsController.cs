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

        [HttpGet] // api/items
        public async Task<ActionResult<List<Tool>>> GetTools()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // api/items/{id}
        public async Task<ActionResult<Tool>> GetTool(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});
        }

        [HttpPost] // api/items
        public async Task<IActionResult> CreateTool(Tool tool)
        {
            return Ok(await Mediator.Send(new Create.Command {Tool = tool}));
        }

        [HttpPut("{id}")] // api/items/{id}
        public async Task<IActionResult> EditTool(Guid id, Tool tool)
        {
            tool.Id = id;
            return Ok(await Mediator.Send(new Edit.Command {Tool = tool}));
        }

        [HttpDelete("{id}")] // api/items/{id}
        public async Task<IActionResult> DeleteTool(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}