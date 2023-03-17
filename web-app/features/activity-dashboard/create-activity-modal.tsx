import { Formik } from 'formik';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@/components/modal';
import type { BaseActivity } from '@/models/activity';

export interface CreateActivityModalProps {
    open: boolean;
    onSubmit: (activity: BaseActivity) => void;
    onClose: () => void;
}

const CreateActivityModal = ({ open, onSubmit, onClose }: CreateActivityModalProps) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);

    return (
        <Modal open={open} labelledBy='activity modal' describedBy='create a new activity'>
            <Typography id='activity-modal-title' variant='h6' component='h2'>
                Create Activity
            </Typography>
            <Divider sx={{ margin: '15px 0px' }} />
            <Formik<BaseActivity>
                initialValues={{ title: '', description: '', category: '', date: '', city: '', venue: '' }}
                validate={(values) => {
                    const errors: Partial<BaseActivity> = {};

                    if (!values.title || values.title.length < 3 || values.title.length > 12) {
                        errors.title = '3-12 characters';
                    }

                    if (!values.category || values.category.length < 3 || values.category.length > 12) {
                        errors.category = '3-12 characters';
                    }

                    if (!values.city || values.city.length < 1 || values.city.length > 16) {
                        errors.city = '1-16 characters';
                    }

                    if (!values.venue || values.venue.length < 1 || values.venue.length > 16) {
                        errors.venue = '1-16 characters';
                    }

                    if (!values.description || values.description.length < 3 || values.description.length > 128) {
                        errors.description = '3-128 characters';
                    }

                    if (!values.date) {
                        errors.date = 'Date is required';
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    onSubmit(values);
                    onClose();
                }}
                onReset={() => {
                    setHasSubmitted(false);
                }}
            >
                {({
                    errors,

                    handleChange,

                    handleBlur,

                    handleSubmit,

                    handleReset,
                }) => (
                    <Box component='form' noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='title'
                                    id='title'
                                    label='Title'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={hasSubmitted && errors.title}
                                    error={hasSubmitted && !!errors.title}
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label='City'
                                    id='city'
                                    name='city'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={hasSubmitted && errors.city}
                                    error={hasSubmitted && !!errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Category'
                                    id='category'
                                    name='category'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={hasSubmitted && errors.category}
                                    error={hasSubmitted && !!errors.category}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Venue'
                                    id='venue'
                                    name='venue'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={hasSubmitted && errors.venue}
                                    error={hasSubmitted && !!errors.venue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    maxRows={2}
                                    id='description'
                                    label='Description'
                                    name='description'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={hasSubmitted && errors.description}
                                    error={hasSubmitted && !!errors.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='date'
                                    type='date'
                                    name='date'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={hasSubmitted && errors.date}
                                    error={hasSubmitted && !!errors.date}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='button'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3 }}
                            onClick={() => {
                                !hasSubmitted && setHasSubmitted(true);
                                if (Object.keys(errors).length > 0) return;
                                handleSubmit();
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            type='button'
                            fullWidth
                            variant='outlined'
                            sx={{ mt: 1 }}
                            onClick={() => {
                                handleReset();
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateActivityModal;
