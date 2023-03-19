import React from 'react';
import KeyIcon from '@mui/icons-material/Key';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export interface AttendeeItemProps {
    name: string;
    image: string;
    isHost: boolean;
    isFollowing: boolean;
}

const AttendeeItem = ({ name, image, isHost, isFollowing }: AttendeeItemProps) => {
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

export default AttendeeItem;
