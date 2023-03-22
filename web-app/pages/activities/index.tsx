import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import communicator from '@/communicator';
import api from '@/data/server';
import ActivitiesDashboard from '@/features/dashboards/activities-dashboard';
import Layout from '@/features/layout';
import sortActivitiesByDate from '@/logic/sort-activities-by-date';
import type { Activity } from '@/models/activity';
import type { User } from '@/models/user';

export interface ActivitiesPageProps {
    user: User | null;
    activities: Activity[];
    error: string | null;
}

const ActivitiesPage = ({ error, ...props }: ActivitiesPageProps) => {
    useEffect(() => {
        error && communicator.publish('enqueue-snackbar', { msg: error, variant: 'error', autoHideDuration: 10000 });
    }, [error]);

    if (error)
        return (
            <Layout>
                <p>An error occurred</p>
            </Layout>
        );

    return (
        <Layout>
            <ActivitiesDashboard {...props} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivitiesPageProps> = async (c) => {
    const currentUser = await api.auth.getCurrentUser(c.req.cookies['reactivities-token'] || '');

    const { response, error } = await api.activities.getAll(c.req.cookies['reactivities-token'] || '');

    if ([401, 403].includes(error?.response?.status || -1)) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    if (error || !response) {
        return {
            props: {
                activities: [],
                user: null,
                error: 'An error occurred whilst fetching activities. Please try again later.',
            },
        };
    }

    return {
        props: {
            activities: sortActivitiesByDate(response.data),
            user: currentUser.response?.data,
            error: null,
        },
    };
};

export default ActivitiesPage;
