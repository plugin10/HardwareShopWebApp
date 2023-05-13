using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ToolsController : BaseApiController
    {
        private readonly DataContext _context;

        public ToolsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // api/items
        public async Task<ActionResult<List<Tool>>> GetItems()
        {
            return await _context.Tools.ToListAsync();
        }

        [HttpGet("{id}")] // api/items/{id}
        public async Task<ActionResult<Tool>> GetItem(Guid id)
        {
            return await _context.Tools.FindAsync(id);
        }
    }
}