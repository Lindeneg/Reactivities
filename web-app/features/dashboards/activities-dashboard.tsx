import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@/components/grid';
import Widget from '@/components/widget';
import ActivityWidget from '@/features/widgets/activity-widget';
import type { Activity } from '@/models/activity';
import useSubscription from '@/utils/use-subscription';

export interface ActivitiesDashboardProps {
    activities: Activity[];
}

const ActivitiesDashboard = (props: ActivitiesDashboardProps) => {
    const [activities, setActivities] = useState(props.activities);
    const router = useRouter();

    useSubscription('created-activity', ({ detail }) => setActivities((prev) => [...prev, detail.activity]));

    useSubscription('updated-activity', ({ detail }) =>
        setActivities((prev) => {
            const index = prev.findIndex((e) => e.id === detail.activity.id);
            if (index === -1) return prev;
            prev[index] = detail.activity;
            return [...prev];
        })
    );

    useSubscription('deleted-activity', ({ detail }) =>
        setActivities((prev) => prev.filter((e) => e.id !== detail.activityId))
    );

    // TODO mobile view
    return (
        <Box style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
            <Grid
                data={activities}
                itemKey={(e) => e.id}
                renderItem={(activity) => (
                    <ActivityWidget
                        activity={activity}
                        onMoreDetails={() => router.push('/activities/' + activity.id)}
                    />
                )}
            />
            <Widget minWidth={375}>Hello</Widget>
        </Box>
    );
};

export default ActivitiesDashboard;
