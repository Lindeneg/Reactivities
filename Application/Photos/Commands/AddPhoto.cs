using Microsoft.AspNetCore.Http;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Photos;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Photo>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IPhotoAccessor _photoAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
            _photoAccessor = photoAccessor;
        }

        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

            var photo = new Photo
            {
                Url = photoUploadResult.Url,
                Id = photoUploadResult.PublicId
            };

            if (!user.Photos.Any(x => x.IsMain))
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Result<Photo>.Success(photo);

            return Result<Photo>.Failure("Problem adding photo");
        }
    }
}