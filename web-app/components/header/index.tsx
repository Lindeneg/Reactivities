import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import HeaderLogo, { type HeaderLogoProps } from './header-logo';
import HeaderProfile from './header-profile';
import HeaderSearch from './header-search';

export interface HeaderProps extends HeaderLogoProps {
    onOpenNavigation: () => void;
}

const Header = ({ name, logoPath, onOpenNavigation }: HeaderProps) => {
    return (
        <Box
            component='header'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                bgcolor: (t) => t.palette.mode === 'dark' ? t.palette.grey[900] : t.palette.grey[200],
            }}
        >
            <Box component='div' sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <IconButton onClick={onOpenNavigation} sx={{ marginRight: '0.5rem' }} aria-label='open menu drawer'>
                    <MenuIcon fontSize='large' />
                </IconButton>
                <HeaderLogo logoPath={logoPath} name={name} />
            </Box>

            <HeaderSearch />

            <HeaderProfile />
        </Box>
    );
};

export default Header;
