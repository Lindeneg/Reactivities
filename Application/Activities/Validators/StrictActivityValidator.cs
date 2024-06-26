using Domain;
using FluentValidation;

namespace Application.Activities;

public class StrictActivityValidator : AbstractValidator<Activity>
{
    public StrictActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Category).NotNull();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
    }
}