import Signup from '@/features/signup';
import withMustBeUnauthenticated from '@/middleware/with-must-be-unauthenticated';

const SignUpPage = () => {
    return <Signup />;
};

export const getServerSideProps = withMustBeUnauthenticated(async () => {
    return {
        props: {},
    };
});

export default SignUpPage;
