import { useRouter } from 'next/router';
import { useState } from 'react';
import Calender from 'react-calendar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Grid from '@/components/grid';
import Widget from '@/components/widget';
import ActivityWidget from '@/features/widgets/activity-widget';
import useListener from '@/hooks/use-listener';
import sortActivitiesByDate from '@/logic/sort-activities-by-date';
import type { Activity, User } from '@/models';

export interface ActivitiesDashboardProps {
    user: User;
    activities: Activity[];
}

const ActivitiesDashboard = (props: ActivitiesDashboardProps) => {
    const [activities, setActivities] = useState(props.activities.map((e) => ({ ...e, date: new Date(e.date) })));
    const router = useRouter();

    useListener('created-activity', ({ detail }) =>
        setActivities((prev) => sortActivitiesByDate([...prev, detail.activity]))
    );

    useListener('updated-activity', ({ detail }) =>
        setActivities((prev) => {
            const index = prev.findIndex((e) => e.id === detail.activity.id);
            if (index === -1) return prev;
            prev[index] = detail.activity;
            return sortActivitiesByDate([...prev]);
        })
    );

    useListener('deleted-activity', ({ detail }) =>
        setActivities((prev) => sortActivitiesByDate(prev.filter((e) => e.id !== detail.activityId)))
    );

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                width: '100%',
                [theme.breakpoints.up('md')]: {
                    flexDirection: 'row-reverse',
                },
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                },
            })}
        >
            <Box>
                <Widget title='Activity Filters' minWidth={375}>
                    <List>
                        <ListItem divider>
                            <ListItemButton selected>
                                <Typography variant='button'>All Activities</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem divider>
                            <ListItemButton>
                                <Typography variant='button'>I&apos;m Going</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem divider>
                            <ListItemButton>
                                <Typography variant='button'>I&apos;m Hosting</Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Widget>
                <Widget cardProps={{ sx: { margin: '1rem 0' } }}>
                    <Calender />
                </Widget>
            </Box>
            <Grid
                data={activities}
                itemKey={(e) => e.id}
                renderItem={(activity) => (
                    <ActivityWidget
                        isHost={true}
                        activity={activity}
                        onMoreDetails={() => router.push('/activities/' + activity.id)}
                    />
                )}
            />
        </Box>
    );
};

export default ActivitiesDashboard;
