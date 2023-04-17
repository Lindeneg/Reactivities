using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    // attempt to reuse mediator if it exists else inject it
    protected IMediator Mediator => (_mediator ??= HttpContext.RequestServices.GetService<IMediator>()) ?? throw new InvalidOperationException();

    // TODO make this more smarter
    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result == null) return NotFound();
        if (result.IsSuccess && result.Value != null)
        {
            return Ok(result.Value);
        }

        if (result.IsSuccess && result.Value == null)
        {
            return NotFound();
        }

        return BadRequest(result.Error);
    }
}