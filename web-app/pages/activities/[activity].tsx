import axios from 'axios';
import type { GetServerSideProps } from 'next';
import DashboardWidget from '@/features/activity-dashboard/activity-widget';
import Layout from '@/features/layout';
import type Activity from '@/models/activity';

interface HomeProps {
    activity: Activity | null;
}

const Home = ({ activity }: HomeProps) => {
    if (!activity) return;
    return (
        <Layout>
            <DashboardWidget activity={activity} onClick={() => null} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    try {
        const data = (await axios.get<Activity>('http://localhost:5000/api/activities/' + context.query.activity)).data;
        return {
            props: {
                activity: data,
            },
        };
    } catch (err) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
};

export default Home;
