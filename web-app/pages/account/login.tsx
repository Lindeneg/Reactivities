import { useSnackbar } from 'notistack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloseSnackbar from '@/components/close-snackbar';
import LoginForm from '@/features/login-form';
import useListener from '@/hooks/use-listener';
import withServerSideUnauthenticated from '@/middleware/with-server-side-unauthenticated';

const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    useListener('enqueue-snackbar', ({ detail }) => {
        const { msg, ...props } = detail;
        enqueueSnackbar(msg, {
            action: (key) => CloseSnackbar({ key }),
            ...props,
        });
    });

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    );
};

export const getServerSideProps = withServerSideUnauthenticated(async () => {
    return {
        props: {},
    };
});

export default LoginPage;
