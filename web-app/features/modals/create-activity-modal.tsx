import { Formik } from 'formik';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@/components/modal';
import api from '@/data/api';
import type { Activity, BaseActivity } from '@/models/activity';
import communicator from '@/utils/communicator';
import useSubscription from '@/utils/use-subscription';

const CreateActivityModal = () => {
    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const hasMadeChange = (values: BaseActivity) => {
        if (!activity) return true;
        for (const key in values) {
            if (values[key as keyof BaseActivity] !== activity[key as keyof BaseActivity]) return true;
        }
        return false;
    };

    useSubscription('set-create-activity-modal-state', ({ detail }) => {
        setShowCreateActivityModal(detail.open);
        if (detail.open) {
            detail.activity && setActivity(detail.activity);
        } else {
            setHasSubmitted(false);
            setShowCreateActivityModal(false);
            setActivity(null);
        }
    });

    const handleClose = () => communicator.publish('set-create-activity-modal-state', { open: false });

    return (
        <Modal open={showCreateActivityModal} labelledBy='activity modal' describedBy='create a new activity'>
            <Typography id='activity-modal-title' variant='h6' component='h2'>
                {activity ? 'Edit' : 'Create'} Activity
            </Typography>
            <Divider sx={{ margin: '15px 0px' }} />
            <Formik<BaseActivity>
                initialValues={{
                    title: activity?.title || '',
                    category: activity?.category || '',
                    city: activity?.city || '',
                    venue: activity?.venue || '',
                    description: activity?.description || '',
                    date: activity?.date || '',
                }}
                validate={(values) => {
                    const errors: Partial<BaseActivity> = {};

                    if (!values.title || values.title.length < 3 || values.title.length > 24) {
                        errors.title = '3-24 characters';
                    }

                    if (!values.category || values.category.length < 3 || values.category.length > 32) {
                        errors.category = '3-12 characters';
                    }

                    if (!values.city || values.city.length < 1 || values.city.length > 32) {
                        errors.city = '1-16 characters';
                    }

                    if (!values.venue || values.venue.length < 1 || values.venue.length > 32) {
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
                onSubmit={async (values) => {
                    await (activity ? api.activities.update(activity.id, values) : api.activities.create(values));
                    handleClose();
                }}
            >
                {({
                    values,

                    errors,

                    isSubmitting,

                    handleChange,

                    handleBlur,

                    handleSubmit,
                }) => (
                    <Box component='form' noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='title'
                                    id='title'
                                    label='Title'
                                    value={values.title}
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
                                    value={values.city}
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
                                    value={values.category}
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
                                    value={values.venue}
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
                                    value={values.description}
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
                                    value={values.date.split('T')[0]}
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
                            disabled={isSubmitting || (!!activity && !hasMadeChange(values))}
                            onClick={() => {
                                !hasSubmitted && setHasSubmitted(true);
                                if (Object.keys(errors).length > 0) return;
                                handleSubmit();
                            }}
                        >
                            {isSubmitting ? <CircularProgress /> : 'Submit'}
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            type='button'
                            fullWidth
                            variant='outlined'
                            sx={{ mt: 1 }}
                            onClick={() => handleClose()}
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
