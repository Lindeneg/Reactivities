using Application.Core;
using Application.Interfaces;
using Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Photos;

public class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

            if (photo == null) return null;

            if (photo.IsMain) return Result<Unit>.Failure("This is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to set main photo");

            return Result<Unit>.Success(Unit.Value);
        }
    }

}