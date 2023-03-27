import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

export interface ProfileMenuWidgetProps {}

const ProfileMenuWidget = ({}: ProfileMenuWidgetProps) => {
    return (
        <List disablePadding>
            <ListItem divider disablePadding>
                <ListItemButton selected>
                    <Typography variant='button'>About</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <Typography variant='button'>Photos</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <Typography variant='button'>Events</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <Typography variant='button'>Followers</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <Typography variant='button'>Following</Typography>
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default ProfileMenuWidget;
