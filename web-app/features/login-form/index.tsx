import { Formik, type FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import api from '@/data/client';
import defaultFormValidation from '@/logic/default-form-validation';
import setFieldErrorFromApi from '@/logic/set-field-error-from-api';
import type { LoginDto } from '@/models';

const LoginForm = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values: LoginDto, helpers: FormikHelpers<LoginDto>) => {
        const { error } = await api.auth.login(values);

        const didSetError = setFieldErrorFromApi(error, values, helpers.setFieldError);

        if (!didSetError) router.push('/');
    };

    return (
        <Box component='form' noValidate sx={{ mt: 1 }}>
            <Formik<LoginDto>
                initialValues={{ email: '', password: '' }}
                validate={defaultFormValidation}
                onSubmit={handleSubmit}
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
                                    onClick={() => router.push('/account/forgot-password')}
                                >
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button size='small' variant='text' onClick={() => router.push('/account/signup')}>
                                    Don&apos;t have an account? Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Formik>
        </Box>
    );
};

export default LoginForm;
