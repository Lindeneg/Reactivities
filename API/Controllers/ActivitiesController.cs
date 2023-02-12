using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Single = Application.Activities.Single;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity?>>> GetActivities()
    {
        return await Mediator.Send(new Many.Query());
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Activity?>> GetActivity(Guid id)
    {
        return await Mediator.Send(new Single.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }
}