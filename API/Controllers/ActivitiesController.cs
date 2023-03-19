using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Domain;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivities.Query());
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new GetActivity.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivity(Activity activity)
    {
        return Ok(await Mediator.Send(new CreateActivity.Command { Activity = activity }));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new EditActivity.Command { Activity = activity }));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return Ok(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
}