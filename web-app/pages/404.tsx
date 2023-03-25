import Error from 'next/error';

// TODO implement page
const Error404 = () => {
    return <Error displayName='hello' statusCode={404} />;
};

export default Error404;
