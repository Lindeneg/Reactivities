import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export interface PlatformFooter {}

const PlatformFooter = ({}: PlatformFooter) => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                bgcolor: (t) => t.palette.grey[900],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">My sticky footer can be found here.</Typography>
            </Container>
        </Box>
    );
};

export default PlatformFooter;
