import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useListener from '@/hooks/use-listener';
import getCategory from '@/logic/get-category';
import type { Activity } from '@/models/activity';
import ActivityAttendanceWidget from '../widgets/activity-attendance-widget';
import ActivityControlWidget from '../widgets/activity-control-widget';
import ActivityInformationWidget from '../widgets/activity-information-widget';
import ChatWidget from '../widgets/chat-widget';

export interface ActivityDashboardProps {
    activity: Activity;
}

const ActivityDashboard = (props: ActivityDashboardProps) => {
    const [activity, setActivity] = useState(props.activity);
    const router = useRouter();

    useListener('deleted-activity', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        router.push('/activities');
    });

    useListener('updated-activity', ({ detail }) => {
        setActivity(detail.activity);
    });

    // TODO mobile view
    return (
        <Box display='flex' flexDirection='row' justifyContent='space-evenly' width='100%'>
            <Stack spacing={2}>
                <Image
                    src={`/images/categoryImages/${getCategory.label(activity.category).toLowerCase()}.jpg`}
                    alt='activity image'
                    width={1024}
                    height={1024}
                    style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />

                <ActivityControlWidget
                    activity={activity}
                    isAttending={true}
                    isHost={true}
                    onAttendActivity={() => {}}
                    onCancelAttendance={() => {}}
                />

                <ActivityInformationWidget
                    hostedBy='Bob'
                    title={activity.title}
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
            <ActivityAttendanceWidget
                attendees={[
                    {
                        name: 'Bob',
                        image: '/images/user.png',
                        isHost: true,
                        isFollowing: true,
                    },
                    {
                        name: 'Tom',
                        image: '/images/user.png',
                        isHost: false,
                        isFollowing: true,
                    },
                    {
                        name: 'Sally',
                        image: '/images/user.png',
                        isHost: false,
                        isFollowing: false,
                    },
                ]}
            />
        </Box>
    );
};

export default ActivityDashboard;
