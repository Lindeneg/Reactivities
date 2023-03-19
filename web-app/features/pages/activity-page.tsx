import Image from 'next/image';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { Activity } from '@/models/activity';
import getCategory from '@/utils/get-category';
import useSubscription from '@/utils/use-subscription';
import ActivityControlWidget from '../widgets/activity-control-widget';
import ActivityInformationWidget from '../widgets/activity-information-widget';
import ChatWidget from '../widgets/chat-widget';

export interface ActivityPageProps {
    activity: Activity;
}

const ActivityPage = ({ activity }: ActivityPageProps) => {
    const router = useRouter();

    useSubscription('deleted-activity', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        router.push('/activities');
    });

    return (
        <Box width='100%'>
            <Stack spacing={2} sx={{ width: '50%' }}>
                <Image
                    src={`/images/categoryImages/${getCategory.label(activity.category).toLowerCase()}.jpg`}
                    alt='activity image'
                    width={1024}
                    height={1024}
                    style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />

                <ActivityControlWidget
                    activity={activity}
                    isAttending={false}
                    isHost={true}
                    onAttendActivity={() => {}}
                    onCancelAttendance={() => {}}
                />

                <ActivityInformationWidget
                    description={activity.description}
                    date={activity.date}
                    city={activity.city}
                    venue={activity.venue}
                />

                <ChatWidget
                    title='Chat about this event'
                    onReplyToEvent={() => {}}
                    onReplyToComment={() => {}}
                    comments={[
                        {
                            id: '1',
                            image: '/images/user.png',
                            name: 'Matt',
                            date: '2021-01-01',
                            comment: 'This is a comment',
                        },
                        {
                            id: '2',
                            image: '/images/user.png',
                            name: 'Joe Henderson',
                            date: '2021-05-01',
                            comment: 'Dude, this is awesome!',
                        },
                    ]}
                />
            </Stack>
            {/* SIDEBAR */}
        </Box>
    );
};

export default ActivityPage;
