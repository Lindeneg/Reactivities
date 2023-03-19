import type { Activity } from '@/models/activity';

export const sortActivitiesByDate = (activities: Activity[]) => {
    return activities.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);

        return bDate.getTime() - aDate.getTime();
    });
};
