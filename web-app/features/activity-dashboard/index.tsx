import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Dashboard from '@/components/dashboard';
import api from '@/data/api';
import type { Activity } from '@/models/activity';
import communicator from '@/utils/communicator';
import useSubscription from '@/utils/use-subscription';
import ActivityWidget from '../widgets/activity-widget';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = (props: ActivityDashboardProps) => {
    const [activities, setActivities] = useState(props.activities);
    const { enqueueSnackbar } = useSnackbar();
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

    const deleteActivity = async (id: string) => {
        communicator.publish('set-global-spinner-state', { open: true });
        const title = activities.find((e) => e.id === id)?.title;
        try {
            await api.activities.delete(id + '2');

            setActivities((prev) => prev.filter((e) => e.id !== id));
            enqueueSnackbar('Successfully deleted activity: ' + title, { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Failed to delete activity: ' + title, { variant: 'error' });
        }
        communicator.publish('set-global-spinner-state', { open: false });
    };

    return (
        <Dashboard
            data={activities}
            itemKey={(e) => e.id}
            renderItem={(e) => (
                <ActivityWidget
                    activity={e}
                    onDelete={deleteActivity}
                    onMoreDetails={() => router.push('/activities/' + e.id)}
                />
            )}
        />
    );
};

export default ActivityDashboard;
