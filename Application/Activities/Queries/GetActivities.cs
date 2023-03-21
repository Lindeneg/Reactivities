﻿using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class GetActivities
{
    public class Query : IRequest<Result<List<ActivityDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {

            var activities = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .ToListAsync(cancellationToken: cancellationToken);

            var mappedActivities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

            return Result<List<ActivityDto>>.Success(mappedActivities);
        }
    }
}