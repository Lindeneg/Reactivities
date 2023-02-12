import type { GetServerSideProps } from 'next';

const Home = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/activities',
            permanent: true,
        },
    };
};

export default Home;
