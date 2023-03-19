import type { Breakpoint, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import withColorContrast from '@/logic/with-color-contrast';

export interface FooterProps {
    children: React.ReactNode;
    sx?: SxProps;
    maxWidth?: Breakpoint;
}

const Footer = ({ children, sx = {}, maxWidth = 'sm' }: FooterProps) => {
    return (
        <Box
            component='footer'
            sx={withColorContrast({
                marginTop: 'auto',
                width: '100%',
                textAlign: 'center',
                ...sx,
            })}
        >
            <Container maxWidth={maxWidth} sx={{ padding: '1rem' }}>
                {children}
            </Container>
        </Box>
    );
};

export default Footer;
