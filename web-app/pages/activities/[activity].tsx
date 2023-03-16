import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import api from '@/axios/activities';
import DashboardWidget from '@/features/activity-dashboard/activity-widget';
import Layout from '@/features/layout';
import type { Activity } from '@/models/activity';

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
        const { data } = await api.getActivity(String(context.query.activity));
        return {
            props: {
                activity: data,
            },
        };
    } catch (err) {
        console.log({ msg: 'Failed to fetch activity', id: context.query.activity, err: (err as AxiosError).cause });

        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
};

export default Home;
