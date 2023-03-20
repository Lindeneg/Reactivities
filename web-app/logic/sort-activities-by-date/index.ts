import type { Activity } from '@/models/activity';

const sortActivitiesByDate = (activities: Activity[]) => {
    return activities.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export default sortActivitiesByDate;
