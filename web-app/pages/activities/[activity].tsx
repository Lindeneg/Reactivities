import type { GetServerSideProps } from 'next';
import api from '@/data/api';
import ActivityDashboard, { type ActivityDashboardProps } from '@/features/dashboards/activity-dashboard';
import Layout from '@/features/layout';

const ActivityPage = (props: ActivityDashboardProps) => {
    return (
        <Layout>
            <ActivityDashboard {...props} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivityDashboardProps> = async (context) => {
    try {
        const { data } = await api.activities.get(String(context.query.activity));
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

export default ActivityPage;
