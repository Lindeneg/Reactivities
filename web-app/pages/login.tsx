import api from '@/data/client';

const Home = () => {
    return (
        <button
            onClick={async () => {
                const response = await api.auth.login({
                    email: 'bob@test.com',
                    password: 'Pa$$w0rd',
                });

                console.log(response);
            }}
        >
            Please Login
        </button>
    );
};

export default Home;
