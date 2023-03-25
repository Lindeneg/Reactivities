import { Formik, type FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { APP_LINK } from '@/constants';
import api from '@/data/client';
import defaultFormValidation from '@/logic/default-form-validation';
import setFieldErrorFromApi from '@/logic/set-field-error-from-api';
import type { SignupDto } from '@/models';

const SignupForm = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values: SignupDto, helpers: FormikHelpers<SignupDto>) => {
        const { error } = await api.auth.signup(values);

        const didSetError = setFieldErrorFromApi(error, values, helpers.setFieldError, () => null);

        if (!didSetError) router.push(APP_LINK.ROOT);
    };

    return (
        <Box component='form' noValidate sx={{ mt: 1 }}>
            <Formik<SignupDto>
                initialValues={{ displayName: '', username: '', email: '', password: '' }}
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='username'
                                    name='username'
                                    required
                                    fullWidth
                                    id='username'
                                    label='Username'
                                    autoFocus
                                    helperText={hasSubmitted && errors.username}
                                    error={hasSubmitted && !!errors.username}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='displayName'
                                    label='Display Name'
                                    name='displayName'
                                    autoComplete='name'
                                    helperText={hasSubmitted && errors.displayName}
                                    error={hasSubmitted && !!errors.displayName}
                                    value={values.displayName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    type='email'
                                    helperText={hasSubmitted && errors.email}
                                    error={hasSubmitted && !!errors.email}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    helperText={hasSubmitted && errors.password}
                                    error={hasSubmitted && !!errors.password}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='button'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                !hasSubmitted && setHasSubmitted(true);
                                handleSubmit();
                            }}
                        >
                            {isSubmitting ? <CircularProgress color='secondary' /> : 'Sign Up'}
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button size='small' variant='text' onClick={() => router.push(APP_LINK.ACCOUNT_LOGIN)}>
                                    Already have an account? Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Formik>
        </Box>
    );
};

export default SignupForm;
