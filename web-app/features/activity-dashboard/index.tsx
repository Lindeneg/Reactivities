import { useRouter } from 'next/router';
import { useState } from 'react';
import Dashboard from '@/components/dashboard';
import type { Activity } from '@/models/activity';
import useCommunicator from '@/utils/use-communicator';
import ActivityWidget from './activity-widget';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = (props: ActivityDashboardProps) => {
    const [activities, setActivities] = useState(props.activities);
    const router = useRouter();

    useCommunicator('created-activity', ({ detail }) => setActivities((prev) => [...prev, detail.activity]));

    useCommunicator('updated-activity', ({ detail }) =>
        setActivities((prev) => {
            const index = prev.findIndex((e) => e.id === detail.activity.id);
            if (index === -1) return prev;
            prev[index] = detail.activity;
            return [...prev];
        })
    );

    useCommunicator('deleted-activity', ({ detail }) =>
        setActivities((prev) => prev.filter((e) => e.id !== detail.activityId))
    );

    return (
        <Dashboard
            data={activities}
            itemKey={(e) => e.id}
            renderItem={(e) => <ActivityWidget activity={e} onClick={() => router.push('/activities/' + e.id)} />}
        />
    );
};

export default ActivityDashboard;
