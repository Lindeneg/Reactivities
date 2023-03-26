import { fillLink } from 'cl-fill-link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@/components/grid';
import { APP_LINK } from '@/constants';
import useListener from '@/hooks/use-listener';
import sortActivitiesByDate from '@/logic/sort-activities-by-date';
import type { Activity, User } from '@/models';
import ActivityFilterWidget from './activity-filter-widget';
import ActivityWidget from './activity-widget';

export interface ActivitiesDashboardProps {
    user: User;
    activities: Activity[];
}

const ActivitiesDashboard = (props: ActivitiesDashboardProps) => {
    const [activities, setActivities] = useState(props.activities.map((e) => ({ ...e, date: new Date(e.date) })));
    const router = useRouter();

    useListener('created-activity', ({ detail }) =>
        setActivities((prev) => sortActivitiesByDate([...prev, detail.activity]))
    );

    useListener('updated-activity', ({ detail }) =>
        setActivities((prev) => {
            const index = prev.findIndex((e) => e.id === detail.activity.id);
            if (index === -1) return prev;
            prev[index] = {
                ...prev[index],
                ...detail.activity,
            };
            return sortActivitiesByDate([...prev]);
        })
    );

    useListener('deleted-activity', ({ detail }) =>
        setActivities((prev) => sortActivitiesByDate(prev.filter((e) => e.id !== detail.activityId)))
    );

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                width: '100%',
                [theme.breakpoints.up('md')]: {
                    flexDirection: 'row-reverse',
                },
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                },
            })}
        >
            <ActivityFilterWidget />
            <Grid
                data={activities}
                itemKey={(e) => e.id}
                renderItem={(activity) => (
                    <ActivityWidget
                        activity={activity}
                        onMoreDetails={() =>
                            router.push(fillLink(APP_LINK.ACTIVITIES_ACTIVITY, { activity: activity.id }))
                        }
                    />
                )}
            />
        </Box>
    );
};

export default ActivitiesDashboard;
