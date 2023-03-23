import { useEffect } from 'react';
import communicator from '@/communicator';
import api from '@/data/server';
import ActivityDashboard from '@/features/dashboards/activity-dashboard';
import Layout from '@/features/layout';
import withServerSideAuth from '@/middleware/with-server-side-auth';
import type { Activity, User } from '@/models';

export interface ActivityPageProps {
    user: User | null;
    activity: Activity | null;
    error: string | null;
}

const ActivityPage = ({ activity, user, error }: ActivityPageProps) => {
    useEffect(() => {
        error && communicator.publish('enqueue-snackbar', { msg: error, variant: 'error', autoHideDuration: 10000 });
    }, [error]);

    if (!activity || !user || error) {
        return (
            <Layout>
                <p>An error occurred</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <ActivityDashboard activity={activity} user={user} />
        </Layout>
    );
};

export const getServerSideProps = withServerSideAuth<ActivityPageProps>(async ({ token, ...user }, cxt) => {
    const { response, error } = await api.activities.get(String(cxt.query.activity), token);

    if (error?.status === 404) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }

    if (error || !response) {
        return {
            props: {
                user: null,
                activity: null,
                error: 'An error occurred whilst fetching the activity. Please try again later.',
            },
        };
    }

    return {
        props: {
            user,
            activity: response.data,
            error: null,
        },
    };
});

export default ActivityPage;
