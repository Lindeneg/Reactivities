import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import api from '@/data/api';
import ActivityDashboard from '@/features/activity-dashboard';
import Layout from '@/features/layout';
import type { Activity } from '@/models/activity';

interface ActivitiesPageProps {
    activities: Activity[];
    error: string | null;
}

const ActivitiesPage = ({ activities, error }: ActivitiesPageProps) => {
    return (
        <Layout>
            {error && <p>{error}</p>}
            <ActivityDashboard activities={activities} />
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
