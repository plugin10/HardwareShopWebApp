using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tools
{
    public class Details
    {
        public class Query : IRequest<Tool>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Tool>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Tool> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Tools.FindAsync(request.Id); // Find the tool with the given id
            }
        }
    }
}