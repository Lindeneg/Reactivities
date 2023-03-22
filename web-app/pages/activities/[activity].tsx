import type { GetServerSideProps } from 'next';
import api from '@/data/server';
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
    const { response, error } = await api.activities.get(
        String(context.query.activity),
        context.req.cookies['reactivities-token'] || ''
    );

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
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }

    return {
        props: {
            activity: response.data,
        },
    };
};

export default ActivityPage;
