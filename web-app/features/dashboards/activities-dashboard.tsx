import { useRouter } from 'next/router';
import { useState } from 'react';
import Calender from 'react-calendar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@/components/grid';
import Widget from '@/components/widget';
import ActivityWidget from '@/features/widgets/activity-widget';
import useListener from '@/hooks/use-listener';
import type { Activity } from '@/models/activity';

export interface ActivitiesDashboardProps {
    activities: Activity[];
}

const ActivitiesDashboard = (props: ActivitiesDashboardProps) => {
    const [activities, setActivities] = useState(props.activities);
    const router = useRouter();

    useListener('created-activity', ({ detail }) => setActivities((prev) => [...prev, detail.activity]));

    useListener('updated-activity', ({ detail }) =>
        setActivities((prev) => {
            const index = prev.findIndex((e) => e.id === detail.activity.id);
            if (index === -1) return prev;
            prev[index] = detail.activity;
            return [...prev];
        })
    );

    useListener('deleted-activity', ({ detail }) =>
        setActivities((prev) => prev.filter((e) => e.id !== detail.activityId))
    );

    // TODO mobile view
    return (
        <Box style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
            <Grid
                data={activities}
                itemKey={(e) => e.id}
                renderItem={(activity) => (
                    <ActivityWidget
                        activity={activity}
                        onMoreDetails={() => router.push('/activities/' + activity.id)}
                    />
                )}
            />
            <Box>
                {/* TODO create activity filters widget */}
                <Widget title='Activity Filters' minWidth={375}>
                    <List>
                        <ListItem divider>
                            <ListItemButton selected>All Activities</ListItemButton>
                        </ListItem>
                        <ListItem divider>
                            <ListItemButton>I&apos;m Going</ListItemButton>
                        </ListItem>
                        <ListItem divider>
                            <ListItemButton>I&apos;m Hosting</ListItemButton>
                        </ListItem>
                    </List>
                </Widget>
                {/* TODO calender widget */}
                <Widget minWidth={375} cardProps={{ sx: { marginTop: '1rem' } }}>
                    <Calender />
                </Widget>
            </Box>
        </Box>
    );
};

export default ActivitiesDashboard;
