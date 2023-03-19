import type { AxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import api from '@/data/api';
import Layout from '@/features/layout';
import ActivitiesPage, { type ActivitiesPageProps } from '@/features/pages/activities-page';

const Page = (props: ActivitiesPageProps) => {
    return (
        <Layout>
            <ActivitiesPage {...props} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<ActivitiesPageProps> = async () => {
    try {
        const { data } = await api.activities.getAll();
        return {
            props: {
                activities: data,
                error: null,
            },
        };
    } catch (err) {
        console.log({ msg: 'Failed to fetch activities', err: (err as AxiosError).cause });

        return {
            props: {
                activities: [],
                error: 'An error occurred whilst fetching activities. Please try again later.',
            },
        };
    }
};

export default Page;
