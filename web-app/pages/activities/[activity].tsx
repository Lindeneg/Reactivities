import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import api from '@/data/api';
import DashboardWidget from '@/features/widgets/activity-widget';
import Layout from '@/features/layout';
import type { Activity } from '@/models/activity';

interface ActivityPageProps {
    activity: Activity | null;
}

const ActivityPage = ({ activity }: ActivityPageProps) => {
    if (!activity) return;
    return (
        <Layout>
            <DashboardWidget activity={activity} onMoreDetails={() => null} onDelete={() => {}} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivityPageProps> = async (context) => {
    try {
        const { data } = await api.activities.get(String(context.query.activity));
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

export default ActivityPage;
