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
import getUserImageOrDefault from '@/logic/get-user-image-or-default';
import type { User } from '@/models';

interface AttendeeItemProps extends User {
    isHost: boolean;
}

const AttendeeItem = ({ displayName, image, isHost }: AttendeeItemProps) => {
    const isFollowing = true;
    return (
        <ListItem divider>
            <ListItemAvatar>
                <Avatar
                    sx={{ width: '32px', height: '32px' }}
                    alt={`${displayName}'s avatar`}
                    src={getUserImageOrDefault(image)}
                />
            </ListItemAvatar>
            <ListItemText primary={displayName} secondary={isFollowing ? 'Following' : ''} />
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
    attendees: User[];
    hostUsername: string;
}

const ActivityAttendanceWidget = ({ attendees, hostUsername }: ActivityAttendanceWidgetProps) => {
    return (
        <Widget title={`${attendees.length} attendees going`} minWidth={375}>
            <List>
                {attendees.map((attendee, idx) => (
                    <AttendeeItem
                        {...attendee}
                        isHost={attendee.username === hostUsername}
                        key={`${attendee.username}-${idx}`}
                    />
                ))}
            </List>
        </Widget>
    );
};

export default ActivityAttendanceWidget;
