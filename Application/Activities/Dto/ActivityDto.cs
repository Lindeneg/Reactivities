using Application.Profiles;

namespace Domain;
public class ActivityDto
{
    public Guid Id { get; set; }
    public string Date { get; set; }
    public CategoryEnum Category { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
    public string HostUsername { get; set; }
    public ICollection<Profile> Profiles { get; set; }
}