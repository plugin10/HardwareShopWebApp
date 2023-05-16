using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tools
{
    public class Create
    {
        public class Command : IRequest
        {
            public Tool Tool { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Tools.Add(request.Tool); // Add the tool to the context
                await _context.SaveChangesAsync(); // Save the changes
                return Unit.Value; // Return a success
                
            }
        }
    }
}