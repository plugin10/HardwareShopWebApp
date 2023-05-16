using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Tools
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; } // The id of the tool to delete
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) // Inject the DataContext
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var tool = await _context.Tools.FindAsync(request.Id); // Find the tool with the given id

                _context.Remove(tool); // Remove the tool from the context

                await _context.SaveChangesAsync(); // Save the changes
                return Unit.Value; // Return a success
                
            }
        }
    }
}