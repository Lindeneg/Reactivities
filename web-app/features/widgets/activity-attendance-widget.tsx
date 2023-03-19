import React from 'react';
import KeyIcon from '@mui/icons-material/Key';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';

export interface ActivityAttendeeItemProps {
    name: string;
    image: string;
    isHost: boolean;
    isFollowing: boolean;
}

const ActivityAttendeeItem = ({ name, image, isHost, isFollowing }: ActivityAttendeeItemProps) => {
    return (
        <ListItem divider>
            <ListItemAvatar>
                <Avatar sx={{ width: '32px', height: '32px' }} alt={`${name}'s avatar`} src={image} />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={isFollowing ? 'Following' : ''} />
            {isHost && (
                <ListItemIcon>
                    <IconButton>
                        <KeyIcon fontSize='small' />
                        <Typography variant='subtitle2' component='small'>
                            Host
                        </Typography>
                    </IconButton>
                </ListItemIcon>
            )}
        </ListItem>
    );
};

export interface ActivityAttendanceWidgetProps {
    attendees: ActivityAttendeeItemProps[];
}

const ActivityAttendanceWidget = ({ attendees }: ActivityAttendanceWidgetProps) => {
    return (
        <Widget
            cardHeaderProps={{
                title: `${attendees.length} attendees going`,
            }}
        >
            <List disablePadding>
                {attendees.map((attendee, idx) => (
                    <ActivityAttendeeItem {...attendee} key={`${attendee.name}-${idx}`} />
                ))}
            </List>
        </Widget>
    );
};

export default ActivityAttendanceWidget;
