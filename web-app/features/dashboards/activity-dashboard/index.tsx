import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useListener from '@/hooks/use-listener';
import getCategory from '@/logic/get-category';
import type { Activity, User } from '@/models';
import ActivityAttendanceWidget from './activity-attendance-widget';
import ActivityChatWidget from './activity-chat-widget';
import ActivityControlWidget from './activity-control-widget';
import ActivityInformationWidget from './activity-information-widget';

export interface ActivityDashboardProps {
    user: User;
    activity: Activity;
}

const ActivityDashboard = (props: ActivityDashboardProps) => {
    const [activity, setActivity] = useState({ ...props.activity, date: new Date(props.activity.date) });
    const router = useRouter();

    useListener('deleted-activity', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        router.push('/activities');
    });

    useListener('updated-activity', ({ detail }) => {
        setActivity(detail.activity);
    });

    return (
        <Box
            display='flex'
            justifyContent='space-evenly'
            width='100%'
            sx={(theme) => ({
                [theme.breakpoints.up('lg')]: {
                    flexDirection: 'row',
                },
                [theme.breakpoints.down('lg')]: {
                    flexDirection: 'column-reverse',
                },
            })}
        >
            <Stack
                spacing={2}
                sx={(theme) => ({
                    [theme.breakpoints.up('lg')]: {
                        margin: '0',
                    },
                    [theme.breakpoints.down('lg')]: {
                        margin: '1rem 0',
                    },
                })}
            >
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

                <ActivityChatWidget
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
