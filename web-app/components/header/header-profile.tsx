import { fillLink } from 'cl-fill-link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LogoutIcon from '@mui/icons-material/Logout';
import SwitchRight from '@mui/icons-material/SwitchRight';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { APP_LINK } from '@/constants';
import createCookieString from '@/logic/create-cookie-string';
import getUserImageOrDefault from '@/logic/get-user-image-or-default';
import withColorContrast from '@/logic/with-color-contrast';
import type { User } from '@/models';

export interface HeaderProfileMenuProps extends User {
    onLogout: () => void;
    onGotoProfile: () => void;
}

const HeaderProfileMenu = ({ displayName, onGotoProfile, onLogout }: HeaderProfileMenuProps) => {
    return (
        <List>
            <ListItem divider>
                <ListItemIcon>
                    <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary={`Hi ${displayName}!`} />
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={onGotoProfile}>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary='Your Profile' />
                </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SwitchRight />
                    </ListItemIcon>
                    <ListItemText primary='Switch Theme' />
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
                <Avatar
                    sx={{
                        width: '28px',
                        height: '28px',
                    }}
                    alt={`${user.displayName}'s avatar`}
                    src={getUserImageOrDefault(user.image)}
                />
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
                    <HeaderProfileMenu
                        {...user}
                        onLogout={onLogout}
                        onGotoProfile={() =>
                            router.push(fillLink(APP_LINK.PROFILE_USERNAME, { username: user.username }))
                        }
                    />
                </Box>
            )}
        </Box>
    );
};

export default HeaderProfile;
