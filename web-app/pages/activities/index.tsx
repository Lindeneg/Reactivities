import axios from 'axios';
import type { GetServerSideProps } from 'next';
import ActivityDashboard from '@/features/activity-dashboard';
import Layout from '@/features/layout';
import type Activity from '@/models/activity';

interface HomeProps {
    activities: Activity[];
    error: string | null;
}

const Home = ({ activities, error }: HomeProps) => {
    return (
        <Layout>
            <ActivityDashboard activities={activities} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    try {
        const data = (await axios.get<Activity[]>('http://localhost:5000/api/activities')).data;
        return {
            props: {
                activities: data,
                error: null,
            },
        };
    } catch (err) {
        return {
            props: {
                activities: [],
                error: 'Failed HTTP call',
            },
        };
    }
};

export default Home;
