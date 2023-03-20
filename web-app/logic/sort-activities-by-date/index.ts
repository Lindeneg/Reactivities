import type { Activity } from '@/models/activity';

const sortActivitiesByDate = (activities: Activity[]) => {
    return activities.sort((a, b) => {
        const aDate = a.date instanceof Date ? a.date : new Date(a.date);
        const bDate = b.date instanceof Date ? b.date : new Date(b.date);

        return bDate.getTime() - aDate.getTime();
    });
};

export default sortActivitiesByDate;
