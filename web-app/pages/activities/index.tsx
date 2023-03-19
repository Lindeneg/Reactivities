import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import communicator from '@/communicator';
import api from '@/data/api';
import ActivitiesDashboard from '@/features/dashboards/activities-dashboard';
import Layout from '@/features/layout';
import sortActivitiesByDate from '@/logic/sort-activities-by-date';
import type { Activity } from '@/models/activity';

export interface ActivitiesPageProps {
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

export const getServerSideProps: GetServerSideProps<ActivitiesPageProps> = async () => {
    try {
        const { data } = await api.activities.getAll();

        return {
            props: {
                activities: sortActivitiesByDate(data),
                error: null,
            },
        };
    } catch (err) {
        return {
            props: {
                activities: [],
                error: 'An error occurred whilst fetching activities. Please try again later.',
            },
        };
    }
};

export default ActivitiesPage;
