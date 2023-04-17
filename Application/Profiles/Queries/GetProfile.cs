using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class GetProfile
{
    public class Query : IRequest<Result<Domain.Profile>>
    {
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Domain.Profile>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<Domain.Profile>> Handle(Query request, CancellationToken cancellationToken)
        {

            var user = await _context.Users
                .ProjectTo<Domain.Profile>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Username == request.Username);

            if (user == null) return null;

            return Result<Domain.Profile>.Success(user);
        }
    }
}