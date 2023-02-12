import axios from 'axios';
import type { GetServerSideProps } from 'next';
import DashboardWidget from '@/components/widget/dashboard-widget';
import Layout from '@/containers/layout';
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
        console.log(err);
    }

    return {
        props: {
            activity: null,
        },
    };
};

export default Home;
