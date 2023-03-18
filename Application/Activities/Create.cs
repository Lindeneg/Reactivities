using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class Command : IRequest<Guid>
    {
        public Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command, Guid>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            //if (request.Activity == null) return Unit.Value;

            var a = _context.Activities.Add(request.Activity);
            await _context.SaveChangesAsync(cancellationToken);

            return a.Entity.Id;
        }
    }
}