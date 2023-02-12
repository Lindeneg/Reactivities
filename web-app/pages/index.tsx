import axios from 'axios';
import Box from '@mui/material/Box';
import type { GetServerSideProps } from 'next';

import PlatformLayout from '@/components/platform-layout';
import type Activity from '@/models/activity';

interface HomeProps {
    activities: Activity[];
}

const Home = ({ activities }: HomeProps) => {
    return (
        <PlatformLayout>
            <Box component="section">
                {activities.map((e) => (
                    <p key={e.id}>{e.title}</p>
                ))}
            </Box>
        </PlatformLayout>
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
