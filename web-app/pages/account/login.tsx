import Login from '@/features/login';
import withMustBeUnauthenticated from '@/middleware/with-must-be-unauthenticated';

const LoginPage = () => {
    return <Login />;
};

export const getServerSideProps = withMustBeUnauthenticated(async () => {
    return {
        props: {},
    };
});

export default LoginPage;
