import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import api from '@/axios/activities';
import ActivityDashboard from '@/features/activity-dashboard';
import Layout from '@/features/layout';
import type { Activity } from '@/models/activity';

interface HomeProps {
    activities: Activity[];
    error: string | null;
}

const Home = ({ activities, error }: HomeProps) => {
    return (
        <Layout>
            {error && <p>{error}</p>}
            <ActivityDashboard activities={activities} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    try {
        const { data } = await api.getActivities();
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

export default Home;
