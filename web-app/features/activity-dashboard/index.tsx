import { useRouter } from 'next/router';
import Dashboard from '@/components/dashboard';
import type Activity from '@/models/activity';
import ActivityWidget from './activity-widget';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = ({ activities }: ActivityDashboardProps) => {
    const router = useRouter();

    return (
        <Dashboard
            data={activities}
            itemKey={(e) => e.id}
            renderItem={(e) => <ActivityWidget activity={e} onClick={() => router.push('/activities/' + e.id)} />}
        />
    );
};

export default ActivityDashboard;
