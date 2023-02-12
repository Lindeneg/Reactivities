import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import HeaderLogo from './header-logo';
import HeaderSearch from './header-search';
import HeaderProfile from './header-profile';

export interface PlatformHeaderProps {
    onOpenDrawer: () => void;
}

const PlatformHeader = ({ onOpenDrawer }: PlatformHeaderProps) => {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                bgcolor: (t) => t.palette.grey[900],
            }}
        >
            <Box component="div" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <IconButton
                    onClick={onOpenDrawer}
                    sx={{ marginRight: '0.5rem' }}
                    aria-label="open menu drawer"
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <HeaderLogo logoPath="/logo.png" name="Reactivities" />
            </Box>

            <HeaderSearch />

            <HeaderProfile />
        </Box>
    );
};

export default PlatformHeader;
