using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tools
{
    public class List
    {
        public class Query : IRequest<List<Tool>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<Tool>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<List<Tool>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Tools.ToListAsync(cancellationToken); // Return all tools
            }
        }
    }
}