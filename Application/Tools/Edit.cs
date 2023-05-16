using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tools
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Tool Tool { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;

                _mapper = mapper;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var tool = await _context.Tools.FindAsync(request.Tool.Id); // Find the tool with the given id

                _mapper.Map(request.Tool, tool); // Map the tool to the tool found in the database

                await _context.SaveChangesAsync(); // Save the changes
                return Unit.Value; // Return a success
                
            }
        }
    }
}