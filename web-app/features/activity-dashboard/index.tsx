import { useRouter } from 'next/router';
import { useState } from 'react';
import Dashboard from '@/components/dashboard';
import type Activity from '@/models/activity';
import ActivityWidget from './activity-widget';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = (props: ActivityDashboardProps) => {
    const [activities, _setActivities] = useState(props.activities);
    const router = useRouter();

    const addActivity = () => {};
    const removeActivity = () => {};
 
    return (
        <Dashboard
            data={activities}
            itemKey={(e) => e.id}
            renderItem={(e) => <ActivityWidget activity={e} onClick={() => router.push('/activities/' + e.id)} />}
        />
    );
};

export default ActivityDashboard;
