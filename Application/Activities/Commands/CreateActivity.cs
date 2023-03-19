using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class CreateActivity
{
    public class Command : IRequest<Result<Guid>>
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new StrictActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Guid>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
            var created = _context.Activities.Add(request.Activity);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Guid>.Failure("Failed to create activity");

            return Result<Guid>.Success(created.Entity.Id);
        }
    }
}