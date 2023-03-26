import { useRouter } from 'next/router';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { APP_LINK } from '@/constants';
import createCookieString from '@/logic/create-cookie-string';
import withColorContrast from '@/logic/with-color-contrast';
import type { User } from '@/models';

export interface HeaderProfileMenuProps extends User {
    onLogout: () => void;
}

const HeaderProfileMenu = ({ displayName, onLogout }: HeaderProfileMenuProps) => {
    return (
        <List>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Logged in as ${displayName}`} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Trash' />
                </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='Spam' />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export interface HeaderProfileProps {
    user: User | null;
}

const HeaderProfile = ({ user }: HeaderProfileProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    if (!user) return null;

    const onLogout = () => {
        document.cookie = createCookieString('', -1);

        router.push(APP_LINK.ACCOUNT_LOGIN);
    };

    return (
        <Box onMouseLeave={() => setOpen(false)}>
            <IconButton
                sx={{ marginRight: '0.5rem' }}
                aria-label='open account toolbox'
                onMouseEnter={() => setOpen(true)}
            >
                <AccountCircleIcon fontSize='large' />
            </IconButton>
            {open && (
                <Box
                    sx={withColorContrast({
                        position: 'absolute',
                        zIndex: '100',
                        right: '3rem',
                        top: '4rem',
                        width: '100%',
                        maxWidth: 250,
                    })}
                >
                    <HeaderProfileMenu {...user} onLogout={onLogout} />
                </Box>
            )}
        </Box>
    );
};

export default HeaderProfile;
