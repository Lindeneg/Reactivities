import Error from 'next/error';

// TODO implement page
const Error500 = () => {
    return <Error displayName='hello' statusCode={500} />;
};

export default Error500;
