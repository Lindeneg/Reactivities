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
    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
    const router = useRouter();

    useCommunicator('toggle-create-activity-modal', () => setShowCreateActivityModal((prev) => !prev));

    useCommunicator('create-activity', (e) => {
        // push to api
        // set in state
        setActivities((prev) => [
            ...prev,
            {
                id: '1',
                title: 'test',
                category: 'test',
                description: 'test',
                date: '2021-01-01',
                city: 'test',
                venue: 'test',
            },
        ]);
    });

    useCommunicator('remove-activity', ({ detail }) => {
        // remove from api
        // remove from state
        setActivities((prev) => prev.filter((e) => e.id !== detail.id));
    });

    /* Show Create Activity Modal Form */
    return (
        <Dashboard
            data={activities}
            itemKey={(e) => e.id}
            renderItem={(e) => <ActivityWidget activity={e} onClick={() => router.push('/activities/' + e.id)} />}
        />
    );
};

export default ActivityDashboard;
