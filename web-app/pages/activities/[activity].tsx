import type { GetServerSideProps } from 'next';
import api from '@/data/api';
import ActivityDashboard, { type ActivityDashboardProps } from '@/features/dashboards/activity-dashboard';
import Layout from '@/features/layout';
import { useEffect } from 'react';

const ActivityPage = (props: ActivityDashboardProps) => {

    useEffect(() => {
        

    }, []);

    return (
        <Layout>
            <ActivityDashboard {...props} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivityDashboardProps> = async (context) => {
    const { response, error } = await api.activities.get(String(context.query.activity));

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
