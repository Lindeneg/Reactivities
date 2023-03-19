import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Dashboard from '@/components/dashboard';
import api from '@/data/api';
import Layout from '@/features/layout';
import ActivityWidget from '@/features/widgets/activity-widget';
import type { Activity } from '@/models/activity';
import communicator from '@/utils/communicator';
import useSubscription from '@/utils/use-subscription';

interface ActivitiesPageProps {
    activities: Activity[];
    error: string | null;
}

const ActivitiesPage = ({ error, ...props }: ActivitiesPageProps) => {
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

    useEffect(() => {
        error && communicator.publish('enqueue-snackbar', { msg: error, variant: 'error', autoHideDuration: 10000 });
    }, [error]);

    const renderWidget = (activity: Activity) => (
        <ActivityWidget activity={activity} onMoreDetails={() => router.push('/activities/' + activity.id)} />
    );

    return (
        <Layout>
            <Dashboard data={activities} itemKey={(e) => e.id} renderItem={renderWidget} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivitiesPageProps> = async () => {
    try {
        const { data } = await api.activities.getAll();
        return {
            props: {
                activities: data,
                error: null,
            },
        };
    } catch (err) {
        console.log({ msg: 'Failed to fetch activities', err: (err as AxiosError).cause });

        return {
            props: {
                activities: [],
                error: 'An error occurred whilst fetching activities. Please try again later.',
            },
        };
    }
};

export default ActivitiesPage;
