import type { GetServerSideProps } from 'next';
import { APP_LINK } from '@/constants';

const Home = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: APP_LINK.ACTIVITIES,
            permanent: true,
        },
    };
};

export default Home;
