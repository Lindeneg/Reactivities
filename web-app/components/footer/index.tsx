import type { Breakpoint, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export interface FooterProps {
    children: React.ReactNode;
    sx?: SxProps;
    maxWidth?: Breakpoint;
}

const Footer = ({ children, sx = {}, maxWidth = 'sm' }: FooterProps) => {
    return (
        <Box
            component='footer'
            sx={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                bgcolor: (t) => t.palette.grey[900],
                ...sx,
            }}
        >
            <Container maxWidth={maxWidth}>{children}</Container>
        </Box>
    );
};

export default Footer;
