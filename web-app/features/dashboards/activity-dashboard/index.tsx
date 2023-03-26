import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { APP_LINK } from '@/constants';
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
    const isHost = activity.hostUsername === props.user.username;

    useListener('deleted-activity', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        router.push(APP_LINK.ACTIVITIES);
    });

    useListener('updated-activity', ({ detail }) => {
        if (activity.id !== detail.activity.id) return;

        setActivity(detail.activity);
    });

    useListener('updated-activity-state', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        setActivity((prev) => ({
            ...prev,
            ...detail,
        }));
    });

    useListener('updated-activity-attendance', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        setActivity((prev) => {
            for (const attendee of prev.attendees) {
                if (attendee.username === props.user.username) {
                    return {
                        ...prev,
                        attendees: prev.attendees.filter((e) => e.username !== props.user.username),
                    };
                }
            }
            return {
                ...prev,
                attendees: [...prev.attendees, props.user],
            };
        });
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

                <ActivityInformationWidget {...activity} />

                <ActivityControlWidget
                    activity={activity}
                    isAttending={!!activity.attendees.find((e) => e.username === props.user.username)}
                    isHost={isHost}
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
            <ActivityAttendanceWidget hostUsername={activity.hostUsername} attendees={activity.attendees} />
        </Box>
    );
};

export default ActivityDashboard;
