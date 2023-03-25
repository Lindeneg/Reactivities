import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseSnackbar from '@/components/close-snackbar';
import api from '@/data/client';
import useListener from '@/hooks/use-listener';
import defaultFormValidation from '@/logic/default-form-validation';
import handleSubmit from '@/logic/handle-submit';
import type { LoginDto } from '@/models';

const SignInPage = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

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
                <Box component='form' noValidate sx={{ mt: 1 }}>
                    <Formik<LoginDto>
                        initialValues={{ email: '', password: '' }}
                        validate={defaultFormValidation}
                        onSubmit={(...args) => handleSubmit(api.auth.login, () => router.push('/'), ...args)}
                    >
                        {({
                            values,

                            errors,

                            isSubmitting,

                            handleChange,

                            handleBlur,

                            handleSubmit,
                        }) => (
                            <>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    helperText={hasSubmitted && errors.email}
                                    error={hasSubmitted && !!errors.email}
                                    value={values.email}
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    helperText={hasSubmitted && errors.password}
                                    error={hasSubmitted && !!errors.password}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='password'
                                    autoComplete='current-password'
                                />
                                <Button
                                    type='button'
                                    onClick={() => {
                                        !hasSubmitted && setHasSubmitted(true);
                                        handleSubmit();
                                    }}
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isSubmitting ? <CircularProgress color='secondary' /> : 'Sign In'}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Button
                                            size='small'
                                            variant='text'
                                            onClick={() => router.push('/forgot-password')}
                                        >
                                            Forgot password?
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size='small' variant='text' onClick={() => router.push('/signup')}>
                                            Don&apos;t have an account? Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Container>
    );
};

// TODO check server-side if user is already logged in, if so, redirect to dashboard

export default SignInPage;
