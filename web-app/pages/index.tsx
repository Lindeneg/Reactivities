import axios from 'axios';
import type { GetServerSideProps } from 'next';
import Layout from '@/containers/layout';
import type Activity from '@/models/activity';
import Box from '@mui/material/Box';

interface HomeProps {
    activities: Activity[];
}

const Home = ({ activities }: HomeProps) => {
    return (
        <Layout>
            <Box component='section'>
                {activities.map((e) => (
                    <p key={e.id}>{e.title}</p>
                ))}
            </Box>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    try {
        const data = (await axios.get<Activity[]>('http://localhost:5000/api/activities')).data;
        return {
            props: {
                activities: data,
            },
        };
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            activities: [],
        },
    };
};

export default Home;
