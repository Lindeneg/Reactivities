import { useEffect } from 'react';
import communicator from '@/communicator';
import api from '@/data/server';
import ActivitiesDashboard from '@/features/dashboards/activities-dashboard';
import Layout from '@/features/layout';
import sortActivitiesByDate from '@/logic/sort-activities-by-date';
import withMustBeAuthenticated from '@/middleware/with-must-be-authenticated';
import type { Activity, User } from '@/models';

export interface ActivitiesPageProps {
    user: User | null;
    activities: Activity[];
    error: string | null;
}

const ActivitiesPage = ({ activities, user, error }: ActivitiesPageProps) => {
    useEffect(() => {
        error && communicator.publish('enqueue-snackbar', { msg: error, variant: 'error', autoHideDuration: 10000 });
    }, [error]);

    if (error || !user) {
        return (
            <Layout>
                <p>An error occurred</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <ActivitiesDashboard activities={activities} user={user} />
        </Layout>
    );
};

export const getServerSideProps = withMustBeAuthenticated<ActivitiesPageProps>(async ({ token, ...user }) => {
    const { response, error } = await api.activities.getAll(token);

    if (error || !response) {
        return {
            props: {
                user: null,
                activities: [],
                error: 'An error occurred whilst fetching activities. Please try again later.',
            },
        };
    }

    return {
        props: {
            user,
            activities: sortActivitiesByDate(response.data),
            error: null,
        },
    };
});

export default ActivitiesPage;
