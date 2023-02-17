import Error from 'next/error';

const Home = () => {
    return (
        <Error displayName='hello' statusCode={500} />
    );
};

export default Home;