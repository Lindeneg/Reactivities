import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import api from '@/data/api';
import Layout from '@/features/layout';
import ActivityPage, { type ActivityPageProps } from '@/features/pages/activity-page';

const Page = (props: ActivityPageProps) => {
    return (
        <Layout>
            <ActivityPage {...props} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivityPageProps> = async (context) => {
    try {
        const { data, status } = await api.activities.get(String(context.query.activity));
        if (!data || status === 204) throw new Error();
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

export default Page;
