import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import api from '@/data/api';
import Layout from '@/features/layout';
import DashboardWidget from '@/features/widgets/activity-widget';
import type { Activity } from '@/models/activity';

interface ActivityPageProps {
    activity: Activity | null;
}

const ActivityPage = ({ activity }: ActivityPageProps) => {
    if (!activity) return;
    return (
        <Layout>
            <Image
                src={`/images/categoryImages/${activity.category.toLowerCase()}.jpg`}
                alt='activity image'
                width={1024}
                height={1024}
                style={{ height: '300px', width: '100%', objectFit: 'cover' }}
            />
            <DashboardWidget activity={activity} onMoreDetails={() => null} />
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
