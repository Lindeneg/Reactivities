import { useRouter } from 'next/router';
import { useState } from 'react';
import Dashboard from '@/components/dashboard';
import type { Activity, BaseActivity } from '@/models/activity';
import useCommunicator from '@/utils/use-communicator';
import ActivityWidget from './activity-widget';
import CreateActivityModal from './create-activity-modal';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = (props: ActivityDashboardProps) => {
    const [activities, setActivities] = useState(props.activities);
    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
    const router = useRouter();

    useCommunicator('set-create-activity-modal-state', ({ detail }) => setShowCreateActivityModal(detail.open));

    const createActivity = async (base: BaseActivity) => {
        console.log(base);
    };

    // useCommunicator('remove-activity', ({ detail }) => {
    //     // remove from api
    //     // remove from state
    //     setActivities((prev) => prev.filter((e) => e.id !== detail.id));
    // });

    return (
        <>
            <CreateActivityModal
                open={showCreateActivityModal}
                onSubmit={createActivity}
                onClose={() => setShowCreateActivityModal(false)}
            />
            <Dashboard
                data={activities}
                itemKey={(e) => e.id}
                renderItem={(e) => <ActivityWidget activity={e} onClick={() => router.push('/activities/' + e.id)} />}
            />
        </>
    );
};

export default ActivityDashboard;
